import { Directive, HostListener, Input, ErrorHandler } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[showHideTrigger]',
  standalone: true,
})
export class ShowHideTriggerDirective {
  @Input() showHideTrigger?: string;

  constructor(private service: ShowHideService, private errorHandler: ErrorHandler) {}

  @HostListener('click')
  onClick() {
    if (this.showHideTrigger) {
      this.service.toggleShow(this.showHideTrigger);
    } else {
      this.errorHandler.handleError(new Error(`Status can not be changed without [id].`));
    }
  }
}
