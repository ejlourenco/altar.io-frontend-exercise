import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import {
	COLUMN_NAME,
	COLUMN_AMOUNT,
	COLUMN_CODE,
	COLUMN_GRID,
	LABEL_PAYMENT,
	LABEL_AMOUNT,
	LABEL_ADD,
	ERROR_INVALD_AMOUNT,
	ERROR_PAYMENT_REQUIRED,
	ERROR_GENERATOR_NOT_ACTIVE,
} from 'src/app/models/constants';
import { GeneratorGrid } from 'src/app/models/generator.model';
import { Payment } from 'src/app/models/payments.model';
import { GeneratorService } from 'src/app/services/generator.service';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
	selector: 'app-payments',
	templateUrl: './payments.component.html',
	styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent {
	constructor(
		private generatorService: GeneratorService,
		private paymentsService: PaymentsService
	) {}

	generatorModel$ = this.generatorService.model$;
	paymentsModel$ = this.paymentsService.model$;

	paymentForm = new FormGroup({
		payment: new FormControl('', [Validators.required]),
		amount: new FormControl('', [Validators.required, this.positiveNumberValidation.bind(this)]),
	});

	positiveNumberValidation(component: FormControl): ValidationErrors {
		if (component.value <= 0) {
			return { required: true };
		}
		return null;
	}

	paymentLabel = LABEL_PAYMENT;
	amountLabel = LABEL_AMOUNT;
	addLabel = LABEL_ADD;

	columns: string[] = ['Name', 'Amount', 'Code', 'Grid'];

	nameColumn = COLUMN_NAME;
	amountColumn = COLUMN_AMOUNT;
	codeColumn = COLUMN_CODE;
	gridColumn = COLUMN_GRID;

	generatorNotActiveError = ERROR_GENERATOR_NOT_ACTIVE;
	paymentRequiredError = ERROR_PAYMENT_REQUIRED;
	invalidAmountError = ERROR_INVALD_AMOUNT;

	onPaymentAdded() {
		const name: string = this.paymentForm.get('payment').value;
		const amount: number = this.paymentForm.get('amount').value;
		const { code, grid } = this.generatorModel$.value;
		const payment: Payment = {
			name,
			amount,
			code,
			grid,
		};
		this.paymentsService.addPayment(payment);
	}

	getGridDataTooltip(grid: GeneratorGrid) {
		let ret = '';
		const gridDataStr = grid.data.join('');
		for (let i = 0; i < grid.rows; i++) {
			ret +=
				'\n' +
				gridDataStr
					.substring(i * grid.columns, i * grid.columns + grid.columns)
					.split('')
					.join(' ');
		}
		return ret.trim();
	}
}
