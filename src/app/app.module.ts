import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatInputModule,MatRadioModule,MatDatepickerModule,MatSelectModule,MatToolbarModule, MatNativeDateModule} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChartComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,MatSelectModule,MatToolbarModule,MatInputModule,MatDatepickerModule,MatNativeDateModule
  ],
  providers: [  
    MatDatepickerModule,  
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
