import { GeneratorGrid } from './generator.model';

export interface Payment {
	name: string;
	amount: number;
	code: string;
	grid: GeneratorGrid;
}
