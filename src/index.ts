import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShowHidePasswordComponent } from './ngx-show-hide-password.component';

export * from './ngx-show-hide-password.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ShowHidePasswordComponent],
  declarations: [ShowHidePasswordComponent]
})

export class ShowHidePasswordModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShowHidePasswordModule
      // , providers: [SampleService]
    };
  }
}
