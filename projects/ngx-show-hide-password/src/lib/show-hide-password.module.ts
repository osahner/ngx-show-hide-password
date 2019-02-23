import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ShowHideTriggerDirective } from './show-hide-trigger.directive';
import { ShowHideInputDirective } from './show-hide-input.directive';
import { ShowHideStatusDirective } from './show-hide-status.directive';
import { ShowHidePasswordComponent } from './show-hide-password.component';

@NgModule({
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  exports: [ShowHidePasswordComponent, ShowHideTriggerDirective, ShowHideInputDirective, ShowHideStatusDirective],
  declarations: [ShowHidePasswordComponent, ShowHideTriggerDirective, ShowHideInputDirective, ShowHideStatusDirective]
})
export class ShowHidePasswordModule {}
