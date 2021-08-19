export interface GeneratorModel {
	isGeneratorActive: boolean;
	progressInPercentage: number;
	countDownSecs: string;
	selectedChar: string;
	isInputEnabled: boolean;
	grid: GeneratorGrid;
	code: string;
	acceptedSelectedChar: string;
}

export interface GeneratorGrid {
	columns: number;
	rows: number;
	data: string[];
}
