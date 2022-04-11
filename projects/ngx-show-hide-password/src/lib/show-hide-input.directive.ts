import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
  HostBinding,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowHideService } from './show-hide.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[showHideInput]',
})
export class ShowHideInputDirective implements OnInit, OnDestroy {
  private subscription?: Subscription;
  @Input() id?: string;

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      throw new Error(`No attribute [id] found.`);
    } else {
      this.service.setShow(this.id, this.el.nativeElement.type !== 'password');

      this.service
        .getObservable(this.id)
        .subscribe((show) =>
          this.renderer.setAttribute(this.el.nativeElement, 'type', show ? 'text' : 'password')
        );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
