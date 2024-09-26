import { Directive, HostListener, inject, input } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[showHideTrigger]',
  standalone: true,
})
export class ShowHideTriggerDirective {
  private service = inject(ShowHideService);

  showHideTrigger = input.required<string>();

  @HostListener('click')
  onClick() {
    this.service.toggleShow(this.showHideTrigger());
  }
}
