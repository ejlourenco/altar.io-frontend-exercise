import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Payment } from '../models/payments.model';

@Injectable({
	providedIn: 'root',
})
export class PaymentsService {
	constructor() {}
	model$ = new BehaviorSubject<Payment[]>([]);

	addPayment(payment: Payment) {
		this.model$.next([...this.model$.value, payment]);
	}
}
