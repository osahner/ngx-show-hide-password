import { Directive, HostListener, Input, ErrorHandler } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[showHideTrigger]',
  standalone: true,
})
export class ShowHideTriggerDirective {
  @Input({ required: true }) showHideTrigger!: string;

  constructor(private service: ShowHideService, private errorHandler: ErrorHandler) {}

  @HostListener('click')
  onClick() {
    this.service.toggleShow(this.showHideTrigger);
  }
}
