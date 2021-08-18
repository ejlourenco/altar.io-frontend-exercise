import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { GeneratorComponent } from './generator.component';
import { GeneratorModule } from './generator.module';

describe('GeneratorComponent', () => {
	let component: GeneratorComponent;
	let fixture: ComponentFixture<GeneratorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [GeneratorModule, NoopAnimationsModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GeneratorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
