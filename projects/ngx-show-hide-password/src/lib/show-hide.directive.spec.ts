import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from './show-hide-password.module';
import { By } from '@angular/platform-browser';

@Component({ selector: 'lib-test', template: '' })
class TestComponent {
  disabled;
  model;
}

describe('ShowHidePasswordModule::Directive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule, ShowHidePasswordModule]
    });
  });

  it('should toggle input type', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const triggerDebugEl = fixture.debugElement.query(By.css('button'));
    const inputDebugEl = fixture.debugElement.query(By.css('input'));

    expect(inputDebugEl.attributes['type']).toBe('password');
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('text');
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('password');
  }));

  it('should toggle status', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const triggerDebugEl = fixture.debugElement.query(By.css('button'));
    const statusDebugEl = fixture.debugElement.query(By.css('i'));

    expect(statusDebugEl.classes['fa-eye']).toBe(true);
    expect(statusDebugEl.classes['fa-eye-slash']).toBe(false);
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(statusDebugEl.classes['fa-eye']).toBe(false);
    expect(statusDebugEl.classes['fa-eye-slash']).toBe(true);
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(statusDebugEl.classes['fa-eye']).toBe(true);
    expect(statusDebugEl.classes['fa-eye-slash']).toBe(false);
  }));

  it('should toggle status for material icons', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{materialIcon: true, id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const triggerDebugEl = fixture.debugElement.query(By.css('button'));
    const statusDebugEl = fixture.debugElement.query(By.css('i'));

    expect(statusDebugEl.properties.innerHTML).toBe('visibility');
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(statusDebugEl.properties.innerHTML).toBe('visibility_off');
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(statusDebugEl.properties.innerHTML).toBe('visibility');
  }));

  it('should initialize with text input', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="text" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const triggerDebugEl = fixture.debugElement.query(By.css('button'));
    const inputDebugEl = fixture.debugElement.query(By.css('input'));

    expect(inputDebugEl.attributes['type']).toBe('text');
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('password');
    triggerDebugEl.triggerEventHandler('click', {});
    tick();
    expect(inputDebugEl.attributes['type']).toBe('text');
  }));

  it('should throw error', fakeAsync(() => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input type="text" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`
      }
    });
    expect(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    }).toThrow();
  }));
});
