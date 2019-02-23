import { Directive, ElementRef, Renderer2, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { ShowHideService } from './show-hide.service';
import { Subscription } from 'rxjs';

export interface ShowHideStatusConfig {
  id: string;
  show?: string;
  hide?: string;
}

@Directive({
  selector: '[showHideStatus]'
})
export class ShowHideStatusDirective implements AfterViewInit, OnDestroy {
  private subscription: Subscription;
  private config: ShowHideStatusConfig;

  @Input() showHideStatus?: ShowHideStatusConfig;

  constructor(private service: ShowHideService, private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const defaultConfig = {
      show: 'showPassword',
      hide: 'hidePassword'
    };
    this.config = {
      ...defaultConfig,
      ...this.showHideStatus
    };
    if (!this.config.id) {
      throw new Error(`No input id found. Please read the docs!`);
    }
    this.subscription = this.service.getObservable(this.config.id).subscribe(show => this.updateClass(show));
    // FIXME really dont like that - but startWith and share does not work either
    this.updateClass(this.service.getShow(this.config.id));
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
