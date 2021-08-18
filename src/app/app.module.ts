import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { HeaderModule } from './components/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneratorModule } from './components/generator/generator.module';

@NgModule({
	declarations: [AppComponent, PaymentsComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HeaderModule,
		BrowserAnimationsModule,
		GeneratorModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
