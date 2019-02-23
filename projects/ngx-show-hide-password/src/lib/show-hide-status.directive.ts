import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input } from '@angular/core';
import { ShowHideService } from './show-hide.service';
import { Subscription } from 'rxjs';

export interface ShowHideStatusConfig {
  show?: string;
  hide?: string;
}

@Directive({
  selector: '[showHideStatus]'
})
export class ShowHideStatusDirective implements OnInit, OnDestroy {
  private subscription: Subscription;
  private config: ShowHideStatusConfig;

  @Input() showHideStatus?: ShowHideStatusConfig;

  constructor(private service: ShowHideService, private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const defaultConfig = {
      show: 'showPassword',
      hide: 'hidePassword'
    };
    this.config = {
      ...defaultConfig,
      ...this.showHideStatus
    };
    this.subscription = this.service.observable.subscribe(show => this.updateClass(show));
    // FIXME really dont like that - but startWith and share does not work either
    this.updateClass(this.service.getShow());
  }

  private updateClass(show: boolean) {
    this.renderer.addClass(this.el.nativeElement, show ? this.config.hide : this.config.show);
    this.renderer.removeClass(this.el.nativeElement, !show ? this.config.hide : this.config.show);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
