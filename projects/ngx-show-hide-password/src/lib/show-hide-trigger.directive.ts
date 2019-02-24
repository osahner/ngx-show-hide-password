import { Directive, HostListener, Input, ErrorHandler } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  selector: '[showHideTrigger]'
})
export class ShowHideTriggerDirective {
  @Input() showHideTrigger?: string;

  constructor(private service: ShowHideService, private errorHandler: ErrorHandler) {}

  @HostListener('click')
  onClick() {
    if (!this.showHideTrigger) {
      this.errorHandler.handleError(new Error(`No input id found. Please read the docs!`));
    } else {
      this.service.toggle(this.showHideTrigger);
    }
  }
}
