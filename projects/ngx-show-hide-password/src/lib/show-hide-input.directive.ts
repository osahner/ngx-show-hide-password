import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ShowHideService } from './show-hide.service';

@UntilDestroy()
@Directive({
  selector: 'input[showHideInput]'
})
export class ShowHideInputDirective implements OnInit {
  private id: string;

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
    this.service
      .getObservable(this.id)
      .pipe(untilDestroyed(this))
      .subscribe(show =>
        this.renderer.setAttribute(this.el.nativeElement, 'type', show ? 'text' : 'password')
      );
  }
}
