/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Renderer2, Input, ErrorHandler, OnDestroy } from '@angular/core';
import { ShowHideService } from './show-hide.service';
import { Subscription } from 'rxjs';

export interface ShowHideStatusConfig {
  id?: string;
  show?: string;
  hide?: string;
  materialIcon?: boolean;
}
const defaultConfig: ShowHideStatusConfig = {
  show: 'visibility',
  hide: 'visibility_off',
  materialIcon: false,
  id: undefined,
};

@Directive({
  selector: '[showHideStatus]',
  standalone: true,
})
export class ShowHideStatusDirective implements OnDestroy {
  private config: ShowHideStatusConfig = defaultConfig;
  private subscription?: Subscription;

  @Input({ required: true }) set showHideStatus(config: ShowHideStatusConfig) {
    this.init(config);
  }

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2,
    private errorHandler: ErrorHandler
  ) {}

  private init(config: ShowHideStatusConfig): void {
    this.config = {
      ...defaultConfig,
      ...config,
    };
    if (this.config.id) {
      this.subscription = this.service
        .getObservable(this.config.id)
        .subscribe((show) => this.updateStatus(show));
    } else {
      this.errorHandler.handleError(new Error(`Status can not be set without [id].`));
    }
  }

  private updateStatus(show: boolean) {
    if (this.config.materialIcon) {
      this.renderer.setProperty(
        this.el.nativeElement,
        'innerHTML',
        show ? this.config.hide : this.config.show
      );
    } else {
      this.renderer.removeClass(
        this.el.nativeElement,
        (!show ? this.config.hide : this.config.show) ?? ''
      );
      this.renderer.addClass(
        this.el.nativeElement,
        (show ? this.config.hide : this.config.show) ?? ''
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
