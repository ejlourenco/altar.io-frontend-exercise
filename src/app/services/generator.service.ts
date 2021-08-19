import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { BehaviorSubject, interval, of } from 'rxjs';
import {
	filter,
	map,
	switchMap,
	tap,
	startWith,
	shareReplay,
	delay,
	concatMap,
	skip,
	throttleTime,
} from 'rxjs/operators';
import {
	AVAILABLE_CHARS,
	CHAR_WEIGHT,
	GRID_REFRESH_TIME_SECS,
	NUMBER_OF_COLUMNS,
	NUMBER_OF_ROWS,
	TIME_TO_WAIT_CHAR_INPUT_SECS,
} from '../models/constants';
import { GeneratorModel } from '../models/generator.model';
import { ClockService } from './clock.service';

@Injectable({
	providedIn: 'root',
})
export class GeneratorService {
	constructor(private clockService: ClockService) {
		combineLatest([
			this.isGeneratorActive$,
			this.progressInPercentage$,
			this.countDownSecs$,
			this.selectedChar$,
			this.isInputEnabled$,
			this.grid$,
			this.code$,
			this.acceptedSelectedChar$,
		])
			.pipe(
				map(
					([
						isGeneratorActive,
						progressInPercentage,
						countDownSecs,
						selectedChar,
						isInputEnabled,
						grid,
						code,
						acceptedSelectedChar,
					]: [boolean, number, string, string, boolean, string[], string, string]) => ({
						isGeneratorActive,
						progressInPercentage,
						countDownSecs,
						selectedChar,
						isInputEnabled,
						grid: {
							data: grid,
							rows: this.getNumberOfRows(),
							columns: this.getNumberOfColumns(),
						},
						code,
						acceptedSelectedChar,
					})
				)
			)
			.subscribe(this.model$);
	}

	availableChars = AVAILABLE_CHARS.split('');

	getInputPattern() {
		return `[${AVAILABLE_CHARS}${AVAILABLE_CHARS.toUpperCase()}]`;
	}

	getNumberOfRows() {
		return NUMBER_OF_ROWS;
	}

	getNumberOfColumns() {
		return NUMBER_OF_COLUMNS;
	}

	getCharWeight() {
		return CHAR_WEIGHT;
	}

	getRandomChar(chars: string[]) {
		return chars[Math.floor(Math.random() * chars.length)];
	}

	private getEmptyGrid() {
		return Array.from({ length: this.getNumberOfRows() * this.getNumberOfColumns() }).map(() => '');
	}

	generateGrid(char?: string): string[] {
		const grid = this.getEmptyGrid();
		const gridLength = grid.length;

		let availableChars = this.availableChars;
		if (char) {
			let numberOfCharOccurrences = this.getCharWeight() * gridLength;
			while (numberOfCharOccurrences > 0) {
				const randomPosition = Math.floor(Math.random() * gridLength);
				if (!grid[randomPosition]) {
					grid[randomPosition] = char;
					numberOfCharOccurrences--;
				}
			}
			availableChars = availableChars.filter((v) => v !== char);
		}
		for (let i = 0; i < gridLength; i++) {
			if (!grid[i]) {
				grid[i] = this.getRandomChar(availableChars);
			}
		}
		return grid;
	}

	calculateCode(grid: string[], date: Date) {
		if (grid[0] === '') {
			return '';
		}
		// Get the 2 digit seconds from the clock, like so: 12:40:36.
		const [d1, d2] = this.getTwoDigitsFromDate(date);

		// Get the matching grid cell values for the positions [3,6] and [6,3], like so: “v” and “c”.
		const char1 = this.getCellValue(grid, d1, d2);
		const char2 = this.getCellValue(grid, d2, d1);
		//const char2 = grid[gridPosition2];

		//3. Count the occurrences of “v” and “c” on the entire grid, like so: v = 7, c = 9.
		let [occurences1, occurences2] = this.getCharOccurrences(grid, char1, char2);

		occurences1 = this.getSmallerOccurencesNumber(occurences1);
		occurences2 = this.getSmallerOccurencesNumber(occurences2);
		return `${occurences1}${occurences2}`;
	}

	private getTwoDigitsFromDate(date: Date): [number, number] {
		const currentTimeSecs = date.getSeconds();
		const currentTimeSecsStr = `${currentTimeSecs}`.padStart(2, '0'); // `${currentTimeSecs < 10 ? '0' : ''}${currentTimeSecs}`;
		const [d1, d2] = currentTimeSecsStr.split('').map((v) => +v);
		return [d1, d2];
	}

	private getCellValue(grid: string[], line: number, column: number) {
		return grid[line * this.getNumberOfColumns() + column];
	}

	private getCharOccurrences(grid: string[], char1: string, char2: string) {
		return grid.reduce(
			(acc, v) => {
				if (v === char1) {
					if (v === char2) {
						return [acc[0] + 1, acc[1] + 1];
					} else {
						return [acc[0] + 1, acc[1]];
					}
				} else if (v === char2) {
					return [acc[0], acc[1] + 1];
				}
				return acc;
			},
			[0, 0]
		);
	}

	private getSmallerOccurencesNumber(occurences: number) {
		let ret = occurences;
		if (ret > 9) {
			let divider = 2;
			while (ret / divider > 9) {
				divider += 1;
			}
			ret = Math.ceil(ret / divider);
		}
		return ret;
	}

	toggleGenerate(value: boolean) {
		this.isGeneratorActive$.next(value);
	}

	changeCharacter(char: string) {
		this.selectedChar$.next(char.toLowerCase());
	}

	private isGeneratorActive$ = new BehaviorSubject(false);
	private selectedChar$ = new BehaviorSubject('');
	private acceptedSelectedChar$ = this.selectedChar$.pipe(
		filter((char) => char === '' || this.availableChars.includes(char)),
		throttleTime(TIME_TO_WAIT_CHAR_INPUT_SECS * 1000)
	);

	private isInputEnabled$ = this.selectedChar$.pipe(
		skip(1),
		filter((char) => this.availableChars.includes(char)),
		switchMap(() =>
			of(0, 1).pipe(
				concatMap((x) =>
					of(x).pipe(
						delay(x * TIME_TO_WAIT_CHAR_INPUT_SECS * 1000),
						map((x) => !!x)
					)
				)
			)
		),
		startWith(true)
	);

	private elapsedTimeMilis$ = this.isGeneratorActive$.pipe(
		switchMap((active) => (active ? interval(50) : of(-1))),
		map((ticks) => (ticks + 1) * 50)
	);

	private countDownSecs$ = this.elapsedTimeMilis$.pipe(
		tap((elapsedTimeMilis) => {
			if (elapsedTimeMilis > GRID_REFRESH_TIME_SECS * 1000) {
				this.isGeneratorActive$.next(this.isGeneratorActive$.value);
			}
		}),
		map((elapsedTimeMilis) =>
			Math.max(0, Math.round(10 * (GRID_REFRESH_TIME_SECS - elapsedTimeMilis / 1000)) / 10).toFixed(
				1
			)
		)
	);

	private progressInPercentage$ = this.elapsedTimeMilis$.pipe(
		map((elapsedTimeMilis) => 100 - (elapsedTimeMilis * 100) / (GRID_REFRESH_TIME_SECS * 1000))
	);

	private grid$ = this.isGeneratorActive$.pipe(
		filter((active) => active === true),
		switchMap(() =>
			this.acceptedSelectedChar$.pipe(
				map((acceptedSelectedChar) => this.generateGrid(acceptedSelectedChar))
			)
		),
		startWith(this.getEmptyGrid()),
		shareReplay()
	);

	private code$ = this.grid$.pipe(
		map((grid) => this.calculateCode(grid, this.clockService.getCurrentDate()))
	);

	model$ = new BehaviorSubject<GeneratorModel>(<any>{});
}
