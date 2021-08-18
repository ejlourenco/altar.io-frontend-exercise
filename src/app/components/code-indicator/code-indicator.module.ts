import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeIndicatorComponent } from './code-indicator.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [CodeIndicatorComponent],
	imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
	exports: [CodeIndicatorComponent],
})
export class CodeIndicatorModule {}
