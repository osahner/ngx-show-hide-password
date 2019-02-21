import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
    <div class="input-group-append ngx-show-hide-password">
      <button class="btn" [ngClass]="btnOutline ? 'btn-outline-' + btnStyle : 'btn-' + btnStyle"
        type="button" (click)="toggleShow($event)"
        [attr.label]="(isHidden ? 'Show password' : 'Hide password')">
        <fa-icon [fixedWidth]="true" size="lg" [icon]="(isHidden ? faEye : faEyeSlash)"></fa-icon>
      </button>
    </div>
  `
})
export class ShowHidePasswordComponent implements OnInit {
  /**
   * Bootstrap 4 style, default is secondary
   */
  @Input()
  public btnStyle: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'secondary';
  /**
   * Button outline style, default is true
   */
  @Input()
  public btnOutline = true;
  /**
   * can be 'sm' = small, 'lg' = large or empty = default
   */
  @Input()
  public size: 'sm' | 'lg' | '';
  /**
   * the shielded Input element
   */
  public input: any;
  /**
   * current state
   */
  public isHidden: boolean;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private elem: ElementRef, private renderer: Renderer2) {}

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
