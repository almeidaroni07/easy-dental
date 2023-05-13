import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'ng-uikit-pro-standard';
import { HomeModule } from './componentes/pages/home.module';

import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    HomeModule
  ],
  exports:[
    BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
