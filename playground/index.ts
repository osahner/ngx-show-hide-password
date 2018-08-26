/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ShowHidePasswordModule } from '../dist';

@Component({
  selector: 'app-playground',
  template: `<show-hide-password btnStyle="primary" [btnOutline]="false" size="lg" icon="fontawesome">
    <input class="form-control" type="password" name="password">
  </show-hide-password>`
})
class AppComponent {}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, ShowHidePasswordModule]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
