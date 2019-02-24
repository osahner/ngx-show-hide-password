import { Component, ElementRef, Input, OnInit, Renderer2, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ShowHideService } from './show-hide.service';
import { Subscription } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ng-content></ng-content>
  <div class="input-group-append ngx-show-hide-password">
    <button class="btn" [ngClass]="(btnOutline ? 'btn-outline-' + btnStyle : 'btn-' + btnStyle)"
      type="button" [showHideTrigger]="id">
      <fa-icon [fixedWidth]="true" size="lg" [icon]="(isHidden ? faEye : faEyeSlash)"
        [showHideStatus]="{id: id}"></fa-icon>
    </button>
  </div>
`
})
export class ShowHidePasswordComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input()
  public btnStyle: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'secondary';

  @Input()
  public btnOutline = true;

  @Input()
  public size: 'sm' | 'lg';

  public input: any;

  public isHidden: boolean;

  public id: string;

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private service: ShowHideService, private elem: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.input = this.elem.nativeElement.querySelector('input');
    if (!this.input) {
      throw new Error(`No input element found. Please read the docs!`);
    }
    this.id = this.input.getAttribute('id');
    if (!this.id) {
      this.id = 'showHideInput' + Math.round(Math.random() * 100000);
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
    this.subscription = this.service.getObservable(this.id).subscribe(show => {
      this.isHidden = !show;
      this.renderer.setAttribute(this.input, 'type', show ? 'text' : 'password');
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
