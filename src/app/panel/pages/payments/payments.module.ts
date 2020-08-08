import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
