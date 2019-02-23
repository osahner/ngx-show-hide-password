import { Directive, HostListener, Input } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  selector: '[showHideTrigger]'
})
export class ShowHideTriggerDirective {
  @Input() showHideTrigger?: string;

  constructor(private service: ShowHideService) {}

  @HostListener('click')
  onClick() {
    if (!this.showHideTrigger) {
      throw new Error(`No input id found. Please read the docs!`);
    }
    this.service.toggle(this.showHideTrigger);
  }
}
