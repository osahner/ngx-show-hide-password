import { Component } from '@angular/core';
import {
  BtnStyle,
  ShowHidePasswordComponent,
  ShowHideInputDirective,
  ShowHideStatusDirective,
  ShowHideTriggerDirective,
} from 'projects/ngx-show-hide-password/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    ShowHidePasswordComponent,
    ShowHideInputDirective,
    ShowHideStatusDirective,
    ShowHideTriggerDirective,
  ],
})
export class AppComponent {
  bindId = 'bindId';
  BtnStyle = BtnStyle;
}
