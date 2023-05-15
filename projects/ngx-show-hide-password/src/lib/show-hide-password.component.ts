/* eslint-disable no-bitwise */
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ChangeDetectionStrategy,
  effect,
  Injector,
} from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ShowHideService } from './show-hide.service';
import { ShowHideStatusDirective } from './show-hide-status.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShowHideTriggerDirective } from './show-hide-trigger.directive';
import { NgClass } from '@angular/common';

export enum BtnStyle {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Dark = 'dark',
  Light = 'light',
}

// hail jed https://gist.github.com/jed/982883
const uuid = (a?: any) =>
  a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ('' + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

/**
 * Add a split input button to password or text input. Toggles input type between "text" and "password".
 *
 * @example
 * <show-hide-password size="sm|lg">
 * <input type="password" name=... />
 * </show-hide-password>
 */

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'show-hide-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
    <button
      class="btn ngx-show-hide-password"
      [ngClass]="btnOutline ? 'btn-outline-' + btnStyle : 'btn-' + btnStyle"
      type="button"
      [showHideTrigger]="id"
    >
      <fa-icon
        [fixedWidth]="true"
        size="lg"
        [icon]="isHidden ? faEye : faEyeSlash"
        [showHideStatus]="{ id: id }"
      ></fa-icon>
    </button>
  `,
  standalone: true,
  imports: [NgClass, ShowHideTriggerDirective, FontAwesomeModule, ShowHideStatusDirective],
})
export class ShowHidePasswordComponent implements OnInit {
  @Input()
  public btnStyle: BtnStyle = BtnStyle.Secondary;

  @Input()
  public btnOutline = true;

  @Input()
  public size?: 'sm' | 'lg';

  public input: any;

  public isHidden?: boolean;

  public id!: string;

  public faEye = faEye;
  public faEyeSlash = faEyeSlash;

  constructor(
    private service: ShowHideService,
    private elem: ElementRef,
    private renderer: Renderer2,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.input = this.elem.nativeElement.querySelector('input');
    if (!this.input) {
      throw new Error(`No input element found.`);
    }
    this.id = this.input.getAttribute('id');
    if (!this.id) {
      this.id = 'showHideInput_' + uuid();
      this.renderer.setAttribute(this.input, 'id', this.id);
    }
    this.renderer.addClass(this.elem.nativeElement, 'input-group');
    if (this.size === 'sm') {
      this.renderer.addClass(this.elem.nativeElement, 'input-group-sm');
    } else if (this.size === 'lg') {
      this.renderer.addClass(this.elem.nativeElement, 'input-group-lg');
    }
    this.isHidden = this.input.type === 'password';
    this.renderer.addClass(this.input, 'form-control'); // just to be sure
    this.service.setShow(this.id, this.input.type !== 'password');

    effect(
      () => {
        const show = this.service.getSignal(this.id)();
        this.isHidden = !show;
        this.renderer.setAttribute(this.input, 'type', show ? 'text' : 'password');
      },
      { injector: this.injector }
    );
  }
}
