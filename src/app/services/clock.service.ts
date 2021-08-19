import { Injectable } from '@angular/core';
import { interval, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class ClockService {
	// this should be the offset assessed when syncing with the API
	timeOffsetClientServer = 0;

	getCurrentDate(): Date {
		const curTime = Date.now();
		return new Date(curTime + this.timeOffsetClientServer);
	}

	currentTime$ = interval(100).pipe(map(() => this.getCurrentDate()));
}
