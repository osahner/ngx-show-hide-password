import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from './show-hide-password.module';

@Component({ template: '' })
class TestComponent {
  disabled: boolean | undefined;
  model: any;
}

describe('ShowHidePasswordModule::Directive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule, ShowHidePasswordModule]
    });
  });

  it('should toggle input type', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const triggerDebugEl: HTMLElement = hostElement.querySelector('button');
    const inputDebugEl: HTMLInputElement = hostElement.querySelector('input');

    expect(inputDebugEl.getAttribute('type')).toBe('password');
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(inputDebugEl.getAttribute('type')).toBe('text');
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(inputDebugEl.getAttribute('type')).toBe('password');
  });

  it('should toggle status', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const triggerDebugEl: HTMLElement = hostElement.querySelector('button');
    const statusDebugEl: HTMLElement = hostElement.querySelector('i');

    expect(statusDebugEl.classList.contains('fa-eye')).toBe(true);
    expect(statusDebugEl.classList.contains('fa-eye-slash')).toBe(false);
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(statusDebugEl.classList.contains('fa-eye')).toBe(false);
    expect(statusDebugEl.classList.contains('fa-eye-slash')).toBe(true);
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(statusDebugEl.classList.contains('fa-eye')).toBe(true);
    expect(statusDebugEl.classList.contains('fa-eye-slash')).toBe(false);
  });

  it('should toggle status for material icons', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{materialIcon: true, id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const triggerDebugEl: HTMLElement = hostElement.querySelector('button');
    const statusDebugEl: HTMLElement = hostElement.querySelector('i');

    expect(statusDebugEl.textContent).toBe('visibility');
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(statusDebugEl.textContent).toBe('visibility_off');
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(statusDebugEl.textContent).toBe('visibility');
  });

  it('should initialize with text input', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="text" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const triggerDebugEl: HTMLElement = hostElement.querySelector('button');
    const inputDebugEl: HTMLInputElement = hostElement.querySelector('input');

    expect(inputDebugEl.getAttribute('type')).toBe('text');
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(inputDebugEl.getAttribute('type')).toBe('password');
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(inputDebugEl.getAttribute('type')).toBe('text');
  });

  it('should fail because of missing id', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="text" name="password" showHideInput [(ngModel)]="model">
        <button type="button" showHideTrigger>
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash'}"></i>
        </button>`
      }
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const triggerDebugEl: HTMLElement = hostElement.querySelector('button');
    const inputDebugEl: HTMLInputElement = hostElement.querySelector('input');

    expect(inputDebugEl.getAttribute('type')).toBe('text');
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(inputDebugEl.getAttribute('type')).toBe('text');
  });

  it('should throw error', () => {
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
  });
});
