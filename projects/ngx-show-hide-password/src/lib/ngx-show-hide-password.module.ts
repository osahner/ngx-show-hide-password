import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ShowHidePasswordComponent } from './ngx-show-hide-password.component';

@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [ShowHidePasswordComponent],
  declarations: [ShowHidePasswordComponent]
})
export class ShowHidePasswordModule {
}
