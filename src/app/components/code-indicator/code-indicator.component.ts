import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {
	LABEL_GENERATOR,
	LABEL_LIVE,
	LABEL_NOT_LIVE,
	LABEL_PAYMENTS,
	LABEL_YOUR_CODE,
	ROUTE_GENERATOR,
	ROUTE_PAYMENTS,
} from 'src/app/models/constants';
import { GeneratorService } from 'src/app/services/generator.service';

@Component({
	selector: 'app-code-indicator',
	templateUrl: './code-indicator.component.html',
	styleUrls: ['./code-indicator.component.scss'],
})
export class CodeIndicatorComponent {
	constructor(private generatorService: GeneratorService) {}

	liveLabel = LABEL_LIVE;
	notLiveLabel = LABEL_NOT_LIVE;
	yourCodeLabel = LABEL_YOUR_CODE;
	model$ = this.generatorService.model$;
}
