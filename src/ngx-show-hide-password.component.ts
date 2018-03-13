import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Add a split input button to password or text input. Toggles input type between "text" and "password".
 *
 * @example
 * <show-hide-password size="sm|lg">
 * <input type="password" name=... />
 * </show-hide-password>
 */
@Component({
  selector: 'show-hide-password',
  template: `
    <ng-content></ng-content>
    <div class="input-group-btn">
      <button *ngIf="icon" class="btn btn-outline-secondary" type="button" (click)="toggleShow($event)"
        [attr.label]="isHidden ? 'Show password' : 'Hide password'" [ngSwitch]="icon">
        <span *ngSwitchCase="'entypo'" class="icon"
          [ngClass]="{'icon-eye-with-line': !isHidden, 'icon-eye': isHidden}"
          [style.font-size]="size === 'lg' ? '1.5rem' : ''"></span>
        <i class="fa fa-fw" [ngClass]="{'fa-eye-slash': !isHidden, 'fa-eye': isHidden, 'fa-lg': size === 'lg'}"
          *ngSwitchDefault></i>
      </button>
      <div *ngIf="!icon" class="input-group-text">
        <input type="checkbox" class="" (click)="toggleShow($event)"
          [attr.label]="isHidden ? 'Show password' : 'Hide password'">
      </div>
    </div>
  `
})
export class ShowHidePasswordComponent implements OnInit {
  /**
   * can be 'sm' = small, 'lg' = large or empty = default
   */
  @Input()
  public size: 'sm' | 'lg' | '';
  /**
   * can be 'fontawesome', 'entypo' or empty for checkbox
   */
  @Input()
  public icon: 'fontawesome' | 'entypo' | '';
  /**
   * the shielded Input element
   */
  public input: any;
  /**
   * current state
   */
  public isHidden: boolean;
  
  constructor(private elem: ElementRef,
              private renderer: Renderer2) {
  }
  
  /**
   * init component
   */
  ngOnInit(): void {
    this.input = this.elem.nativeElement.querySelector('input');
    if (this.input) {
      this.renderer.addClass(this.elem.nativeElement, 'input-group');
      if (this.size === 'sm') {
        this.renderer.addClass(this.elem.nativeElement, 'input-group-sm');
      } else if (this.size === 'lg') {
        this.renderer.addClass(this.elem.nativeElement, 'input-group-lg');
      }
      this.isHidden = this.input.type === 'password';
      this.renderer.addClass(this.input, 'form-control'); // just to be sure
    } else {
      throw new Error(`No input element found. Please read the docs!`);
    }
  }
  
  /**
   * toggles type of input (text|password)
   * @param $event not used
   */
  public toggleShow($event: any): void {
    this.isHidden = !this.isHidden;
    this.renderer.setAttribute(this.input, 'type', this.isHidden ? 'password' : 'text');
  }
}
