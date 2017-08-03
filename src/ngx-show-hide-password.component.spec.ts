import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from './';
import { By } from '@angular/platform-browser';

describe('ShowHidePasswordModule', () => {
  
  beforeEach(
    () => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [
          FormsModule,
          ShowHidePasswordModule.forRoot()
        ]
      });
    });
  
  it('should work', fakeAsync(() => {
    const fixture = TestBed.overrideComponent(TestComponent, {
      set: {
        template: `<show-hide-password size="sm" icon="fontwaesome"><input type="password" [(ngModel)]="model"></show-hide-password>`
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
});

@Component({ selector: 'test-cmp', template: '' })
class TestComponent {
  disabled;
  model;
}

