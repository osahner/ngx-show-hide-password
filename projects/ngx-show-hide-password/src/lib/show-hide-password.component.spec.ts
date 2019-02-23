import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from './show-hide-password.module';
import { By } from '@angular/platform-browser';

@Component({ selector: 'show-test', template: '' })
class TestComponent {
  disabled;
  model;
}

describe('ShowHidePasswordModule::Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule, ShowHidePasswordModule]
    });
  });

  it('should toggle state', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="sm"><input type="password" [(ngModel)]="model"></show-hide-password>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const buttonDebugEl = fixture.debugElement.query(By.css('button'));
    const inputDebugEl = fixture.debugElement.query(By.css('input'));

    expect(inputDebugEl.attributes['type']).toBe('password');
    buttonDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('text');
    buttonDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('password');
  }));

  it('should initialize with text input', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="sm"><input type="text" [(ngModel)]="model"></show-hide-password>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const buttonDebugEl = fixture.debugElement.query(By.css('button'));
    const inputDebugEl = fixture.debugElement.query(By.css('input'));

    expect(inputDebugEl.attributes['type']).toBe('text');
    buttonDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('password');
    buttonDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('text');
  }));

  it('should throw error', fakeAsync(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="sm"></show-hide-password>`
      }
    });
    expect(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    }).toThrow();
  }));
});
