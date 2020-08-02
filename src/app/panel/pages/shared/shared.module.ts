import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    AgGridComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    AgGridComponent
  ]
})
export class SharedModule { }
