import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [MainPanelComponent],
  imports: [
    CommonModule,
    PanelRoutingModule,
    AgGridModule.withComponents([]),
  ]
})
export class PanelModule { }
