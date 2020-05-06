import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'ag-grid-enterprise';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';
import { TitleEditComponent } from './title-edit/title-edit.component';

@NgModule({
  declarations: [AppComponent, CheckboxHeaderComponent, TitleEditComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([TitleEditComponent]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
