import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordComponent } from './ngx-show-hide-password.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  exports: [ShowHidePasswordComponent],
  declarations: [ShowHidePasswordComponent]
})
export class ShowHidePasswordModule {
  /* static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShowHidePasswordModule
    };
  } */
}
