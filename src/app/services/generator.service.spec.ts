import { TestBed } from '@angular/core/testing';
import { AVAILABLE_CHARS } from '../models/constants';

import { GeneratorService } from './generator.service';

describe('GeneratorService', () => {
	let service: GeneratorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GeneratorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should generate a grid with 20 occurences of given char', () => {
		const char = 'c';
		const grid = service.generateGrid(char);
		const occurencesOfChar = grid.filter((v) => v === char).length;
		expect(occurencesOfChar).toBe(20);
	});
	describe('generate code', () => {
		it('returns the correct code for a given grid and date', () => {
			// a grid with all chars in alphabetical order
			// abcdefghij
			// klmnopqrst
			// uvwxyzabcd
			// efghijklmn
			// opqrstuvwx
			// yzabcdefgh
			// ijklmnopqr
			// stuvwxyzab
			// cdefghijkl
			// mnopqrstuv
			const grid = Array.from({ length: 100 }).map((v, i) => AVAILABLE_CHARS[i % 26]);
			const date = new Date(2021, 7, 18, 8, 0, 24);
			// char1 = y, char2 = a
			// occurrences of y = 3
			// occurrences of a = 4
			const expextedCode = '34';

			const code = service.calculateCode(grid, date);

			expect(code).toBe(expextedCode);
		});
		it('returns the correct code for a given grid and date when there are >= 10 occurrences', () => {
			// a grid with all lines the same
			// abcdefghij (10 times)
			const grid = Array.from({ length: 100 }).map((v, i) => AVAILABLE_CHARS[i % 10]);
			const date = new Date(2021, 7, 18, 8, 0, 24);
			// char1 = e, char2 = c
			// occurrences of y = 10
			// occurrences of a = 10
			const expextedCode = '55';

			const code = service.calculateCode(grid, date);

			expect(code).toBe(expextedCode);
		});
		it('returns the correct code for a given grid and date when there are >= 20 occurrences', () => {
			// a grid with all lines the same
			// abcdeabcde (10 times)
			const grid = Array.from({ length: 100 }).map((v, i) => AVAILABLE_CHARS[i % 5]);
			const date = new Date(2021, 7, 18, 8, 0, 4);
			// char1 [0,4] = e, char2 [4,0] = a
			// occurrences of e = 20
			// occurrences of a = 20
			const expextedCode = '77';

			const code = service.calculateCode(grid, date);

			expect(code).toBe(expextedCode);
		});
	});
});
