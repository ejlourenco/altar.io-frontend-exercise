import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { HeaderModule } from './components/header/header.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneratorModule } from './components/generator/generator.module';
import { PaymentsModule } from './components/payments/payments.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HeaderModule,
		BrowserAnimationsModule,
		GeneratorModule,
		PaymentsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
