import { Component } from '@angular/core';
import { BtnStyle } from 'ngx-show-hide-password';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  bindId = 'bindId';
  BtnStyle = BtnStyle;
}
