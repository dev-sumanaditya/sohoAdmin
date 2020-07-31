import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AgGridComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  exports: [
    AgGridComponent
  ]
})
export class SharedModule { }
