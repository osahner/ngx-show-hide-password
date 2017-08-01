import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { } from 'jasmine';

import { ShowHidePasswordComponent } from './ngx-show-hide-password.component';

describe('ShowHidePasswordComponent', () => {

  let comp:    ShowHidePasswordComponent;
  let fixture: ComponentFixture<ShowHidePasswordComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHidePasswordComponent ], // declare the test component
    });

    fixture = TestBed.createComponent(ShowHidePasswordComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('span'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
