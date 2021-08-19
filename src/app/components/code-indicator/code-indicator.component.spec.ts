import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeIndicatorComponent } from './code-indicator.component';

describe('HeaderComponent', () => {
	let component: CodeIndicatorComponent;
	let fixture: ComponentFixture<CodeIndicatorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CodeIndicatorComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CodeIndicatorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
