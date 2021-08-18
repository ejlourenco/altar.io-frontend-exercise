import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GeneratorComponent } from './generator.component';
import { FormsModule } from '@angular/forms';
import { CodeIndicatorModule } from '../code-indicator/code-indicator.module';

@NgModule({
	declarations: [GeneratorComponent],
	imports: [
		CommonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatSlideToggleModule,
		CodeIndicatorModule,
	],
	exports: [GeneratorComponent],
})
export class GeneratorModule {}
