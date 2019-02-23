import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { ShowHideService } from './show-hide.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[showHideInput]'
})
export class ShowHideInputDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private service: ShowHideService, private el: ElementRef, private renderer: Renderer2) {
    this.service.setShow(this.el.nativeElement.type !== 'password');
  }

  ngOnInit(): void {
    this.subscription = this.service.observable.subscribe(show =>
      this.renderer.setAttribute(this.el.nativeElement, 'type', show ? 'text' : 'password')
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
