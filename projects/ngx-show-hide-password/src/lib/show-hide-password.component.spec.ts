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
  disabled?: boolean;
  model?: any;
}

describe('ShowHidePasswordModule::Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, TestComponent],
    });
  });

  it('should create the test component', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should toggle input type', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="sm"><input type="password" [(ngModel)]="model"></show-hide-password>`,
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

  it('should initialize with text input', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="lg"><input type="text" [(ngModel)]="model" id="secretpass"></show-hide-password>`,
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

  it('should throw error', () => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password></show-hide-password>`,
      },
    });
    expect(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    }).toThrow();
  });
});
