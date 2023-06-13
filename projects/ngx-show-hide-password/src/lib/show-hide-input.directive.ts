import { Directive, ElementRef, Renderer2, OnInit, Input, effect } from '@angular/core';
import { ShowHideService } from './show-hide.service';

@Directive({
  selector: 'input[showHideInput]'
})
export class ShowHideInputDirective implements OnInit {
  @Input({ required: true }) id!: string;
  @Input(/* { transform: booleanAttribute } */) disabled: boolean = false;

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.id = this.el.nativeElement.getAttribute('id');
    if (!this.id) {
      throw new Error(`No attribute [id] found.`);
    }
    this.service.setShow(this.id, this.el.nativeElement.type !== 'password');
  }

  ngOnInit(): void {
    this.service.setShow(this.id, this.el.nativeElement.type !== 'password');
    effect(
      () => {
        if (this.disabled) return;
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
