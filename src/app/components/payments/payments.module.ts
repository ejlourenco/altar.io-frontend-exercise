import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PaymentsComponent } from './payments.component';
import { CodeIndicatorModule } from '../code-indicator/code-indicator.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [PaymentsComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatTableModule,
		CodeIndicatorModule,
	],
	exports: [PaymentsComponent],
})
export class PaymentsModule {}
