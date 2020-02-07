import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ShowHidePasswordModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
