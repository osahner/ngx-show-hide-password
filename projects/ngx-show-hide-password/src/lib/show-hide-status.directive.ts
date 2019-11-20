import { Directive, ElementRef, Renderer2, Input, ErrorHandler } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ShowHideService } from './show-hide.service';

export interface ShowHideStatusConfig {
  id?: string;
  show?: string;
  hide?: string;
  materialIcon?: boolean;
}

@UntilDestroy()
@Directive({
  selector: '[showHideStatus]'
})
export class ShowHideStatusDirective {
  private config: ShowHideStatusConfig;

  @Input() set showHideStatus(config: ShowHideStatusConfig) {
    this.init(config);
  }

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2,
    private errorHandler: ErrorHandler
  ) {}

  private init(config: ShowHideStatusConfig): void {
    const defaultConfig = {
      show: 'visibility',
      hide: 'visibility_off',
      materialIcon: false,
      id: null
    };
    this.config = {
      ...defaultConfig,
      ...config
    };
    if (this.config.id) {
      this.service
        .getObservable(this.config.id)
        .pipe(untilDestroyed(this))
        .subscribe(show => this.updateStatus(show));
    } else {
      this.errorHandler.handleError(new Error(`No input id found. Please read the docs.`));
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
      this.renderer.removeClass(this.el.nativeElement, !show ? this.config.hide : this.config.show);
      this.renderer.addClass(this.el.nativeElement, show ? this.config.hide : this.config.show);
    }
  }
}
