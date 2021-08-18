import { Component } from '@angular/core';
import {
	LABEL_GENERATOR,
	LABEL_PAYMENTS,
	ROUTE_GENERATOR,
	ROUTE_PAYMENTS,
} from 'src/app/models/constants';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	routeGenerator = `/${ROUTE_GENERATOR}`;
	labelGenerator = LABEL_GENERATOR;

	routePayments = `/${ROUTE_PAYMENTS}`;
	labelPayments = LABEL_PAYMENTS;
}
