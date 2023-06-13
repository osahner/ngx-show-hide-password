/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  ErrorHandler,
  effect,
  Injector,
} from '@angular/core';
import { ShowHideService } from './show-hide.service';

export interface ShowHideStatusConfig {
  id?: string;
  show?: string;
  hide?: string;
  materialIcon?: boolean;
}
const defaultConfig: Partial<ShowHideStatusConfig> = {
  show: 'visibility',
  hide: 'visibility_off',
  materialIcon: false,
};

@Directive({
  selector: '[showHideStatus]',
  standalone: true,
})
export class ShowHideStatusDirective {
  private config: Partial<ShowHideStatusConfig> = defaultConfig;

  @Input({ required: true }) set showHideStatus(config: ShowHideStatusConfig) {
    this.init(config);
  }

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2,
    private errorHandler: ErrorHandler,
    private injector: Injector
  ) {}

  private init(config: ShowHideStatusConfig): void {
    this.config = {
      ...defaultConfig,
      ...config,
    };
    if (this.config.id) {
      effect(
        () => {
          this.updateStatus(this.service.getSignal(this.config.id!!)());
        },
        { injector: this.injector }
      );
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
}
