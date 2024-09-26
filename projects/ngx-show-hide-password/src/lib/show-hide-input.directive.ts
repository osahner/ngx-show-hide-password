import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  effect,
  Injector,
  inject,
  input,
} from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[showHideInput]',
  standalone: true,
})
export class ShowHideInputDirective implements OnInit {
  private service = inject(ShowHideService);
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private injector = inject(Injector);

  id = input.required<string>();
  disabled = input(false, {
    transform: (value: boolean | string) => (typeof value === 'string' ? value === '' : value),
  });

  ngOnInit(): void {
    this.service.setShow(this.id(), this.el.nativeElement.type !== 'password');
    effect(
      () => {
        if (this.disabled()) return;
        this.renderer.setAttribute(
          this.el.nativeElement,
          'type',
          this.service.getSignal(this.id())() ? 'text' : 'password'
        );
      },
      { injector: this.injector }
    );
  }
}
