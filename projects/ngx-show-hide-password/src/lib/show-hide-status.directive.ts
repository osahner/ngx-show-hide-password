/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  ErrorHandler,
  effect,
  Injector,
  inject,
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

// TODO: don't trigger on disabled element
@Directive({
  selector: '[showHideStatus]',
  standalone: true,
})
export class ShowHideStatusDirective {
  private service = inject(ShowHideService);
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private errorHandler = inject(ErrorHandler);
  private injector = inject(Injector);

  private config: Partial<ShowHideStatusConfig> = defaultConfig;

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input({ required: true }) set showHideStatus(config: ShowHideStatusConfig) {
    this.init(config);
  }

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
