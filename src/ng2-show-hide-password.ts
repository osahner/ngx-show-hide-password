
import { NgModule, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * @whatItDoes Add show hide button to text/password input fields.
 *
 * @howToUse
 * <show-hide-password size="sm|lg">
 *   <input type="password" name=... />
 * </show-hide-password>
 *
 * @description Add split input button to password or text input. Toggles input type between "text" and "password".
 */
@Component({
  selector: 'show-hide-password',
  template: `
    <ng-content></ng-content>
    <span class="input-group-btn">
      <button class="btn btn-secondary py-0" type="button" (click)="toggleShow($event)">
        <i class="fa" [ngClass]="{'fa-eye-slash': !isHidden, 'fa-eye': isHidden, 'fa-2x': size === 'lg'}"></i>
      </button>
    </span>`,
})
export class ShowHidePasswordComponent implements OnInit {
  @Input()
  public size: 'sm' | 'lg';

  public input: any;

  public isHidden: boolean;

  constructor(private elem: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.input = this.elem.nativeElement.querySelector('input');
    this.renderer.addClass(this.elem.nativeElement, 'input-group');
    if (this.size === 'sm') {
      this.renderer.addClass(this.elem.nativeElement, 'input-group-sm');
    } else if (this.size === 'lg') {
      this.renderer.addClass(this.elem.nativeElement, 'input-group-lg');
    }

    this.isHidden = this.input.type === 'password';
  }


  public toggleShow($event: any) {
    this.isHidden = !this.isHidden;
    this.renderer.setAttribute(this.input, 'type', this.isHidden ? 'password' : 'text');
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ShowHidePasswordComponent],
  declarations: [ShowHidePasswordComponent],
})
export class ShowHidePasswordModule {
}
