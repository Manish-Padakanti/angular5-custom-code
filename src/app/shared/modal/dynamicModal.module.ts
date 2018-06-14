import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { ConfirmService, ConfirmState, ConfirmTemplateDirective, CustomModalComponent } from './confirm-modal-and-service';

//import { DynamicModalComponent } from './dynamicModal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [        
    ConfirmTemplateDirective, 
    CustomModalComponent
  ],
  declarations: [
    ConfirmTemplateDirective, 
    CustomModalComponent
],
providers: [
    ConfirmService,
    ConfirmState
]
})
export class DynamicModalModule { }
