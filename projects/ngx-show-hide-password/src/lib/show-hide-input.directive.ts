import { Directive, ElementRef, Renderer2, OnInit, Input, effect, Injector } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[showHideInput]',
  standalone: true,
})
export class ShowHideInputDirective implements OnInit {
  @Input({ required: true }) id!: string;

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.service.setShow(this.id, this.el.nativeElement.type !== 'password');
    effect(
      () => {
        this.renderer.setAttribute(
          this.el.nativeElement,
          'type',
          this.service.getSignal(this.id)() ? 'text' : 'password'
        );
      },
      { injector: this.injector }
    );
  }
}
