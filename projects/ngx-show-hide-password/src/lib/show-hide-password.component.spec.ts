import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from './show-hide-password.module';

@Component({ template: '' })
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

  it('should toggle input type', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="sm"><input type="password" [(ngModel)]="model"></show-hide-password>`
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

  it('should initialize with text input', () => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="lg"><input type="text" [(ngModel)]="model"></show-hide-password>`
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

  it('should throw error', () => {
    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="sm"></show-hide-password>`
      }
    });
    expect(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    }).toThrow();
  });
});
