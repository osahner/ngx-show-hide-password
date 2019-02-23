import { Directive, HostListener } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  selector: '[showHideTrigger]'
})
export class ShowHideTriggerDirective {
  constructor(private service: ShowHideService) {}

  @HostListener('click')
  onClick() {
    this.service.toggle();
  }
}
