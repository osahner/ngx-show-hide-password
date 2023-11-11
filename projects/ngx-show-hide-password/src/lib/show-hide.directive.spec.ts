import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordComponent } from './show-hide-password.component';
import { ShowHideInputDirective } from './show-hide-input.directive';
import { ShowHideStatusDirective } from './show-hide-status.directive';
import { ShowHideTriggerDirective } from './show-hide-trigger.directive';

@Component({
  template: '',
  standalone: true,
  imports: [
    FormsModule,
    ShowHidePasswordComponent,
    ShowHideInputDirective,
    ShowHideStatusDirective,
    ShowHideTriggerDirective,
  ],
})
class TestComponent {
  disabled: boolean | undefined;
  model: any;
}

describe('ShowHidePasswordModule::Directive', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestComponent],
    });
  });

  it('should toggle input type', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model" />
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`,
      },
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
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model" />
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`,
      },
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

  // TODO: don't trigger on disabled element
  it('should not toggle, because input is disabled', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput disabled [(ngModel)]="model" />
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`,
      },
    }).createComponent(TestComponent);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement;
    const triggerDebugEl: HTMLElement = hostElement.querySelector('button');
    const statusDebugEl: HTMLElement = hostElement.querySelector('i');
    const inputDebugEl: HTMLInputElement = hostElement.querySelector('input');

    expect(inputDebugEl.getAttribute('type')).toBe('password');
    // expect(statusDebugEl.classList.contains('fa-eye')).toBe(true);
    triggerDebugEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(inputDebugEl.getAttribute('type')).toBe('password');
    // expect(statusDebugEl.classList.contains('fa-eye')).toBe(true);
  });

  it('should toggle status for material icons', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<input id="test2" type="password" name="password" showHideInput [(ngModel)]="model" />
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{materialIcon: true, id: 'test2'}"></i>
        </button>`,
      },
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
        template: `<input id="test2" type="text" name="password" showHideInput [(ngModel)]="model" />
        <button type="button" showHideTrigger="test2">
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash', id: 'test2'}"></i>
        </button>`,
      },
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
        template: `<input id="test2" type="text" name="password" showHideInput [(ngModel)]="model" />
        <button type="button" showHideTrigger>
          <i [showHideStatus]="{show: 'fa-eye', hide: 'fa-eye-slash'}"></i>
        </button>`,
      },
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
});
