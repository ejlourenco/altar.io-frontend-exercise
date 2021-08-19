import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
	LABEL_CHARACTER,
	PLACEHOLDER_CHARACTER,
	LABEL_GENERATE_2D_GRID,
	ERROR_CHAR_NOT_VALID,
} from 'src/app/models/constants';
import { ClockService } from 'src/app/services/clock.service';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
	selector: 'app-generator',
	templateUrl: './generator.component.html',
	styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent {
	constructor(private generatorService: GeneratorService, private clockService: ClockService) {}

	characterLabel = LABEL_CHARACTER;
	characterPlaceholder = PLACEHOLDER_CHARACTER;
	generate2dGridLabel = LABEL_GENERATE_2D_GRID;
	charNotValidError = ERROR_CHAR_NOT_VALID;
	numberOfColumns = this.generatorService.getNumberOfColumns();
	numberOfRows = this.generatorService.getNumberOfRows();
	selectedChar = '';
	pattern = this.generatorService.getInputPattern();
	currentTime$ = this.clockService.currentTime$;

	columns = Array.from({ length: this.numberOfColumns }).map((v, i) => i);
	rows = Array.from({ length: this.numberOfRows }).map((v, i) => i);

	model$ = this.generatorService.model$;

	ngOnInit() {
		this.model$
			.pipe(take(1))
			.subscribe((model) => (this.selectedChar = model.acceptedSelectedChar));
	}

	onCharacterChanged(char: string) {
		this.selectedChar = char;
		this.generatorService.changeCharacter(char);
	}

	toggleGenerate({ checked }: { checked: boolean }) {
		this.generatorService.toggleGenerate(checked);
	}
}
