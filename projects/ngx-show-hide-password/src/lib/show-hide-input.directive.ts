import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowHideService } from './show-hide.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[showHideInput]',
  standalone: true,
})
export class ShowHideInputDirective implements OnInit, OnDestroy {
  private subscription?: Subscription;
  @Input({ required: true }) id!: string;

  constructor(
    private service: ShowHideService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.service.setShow(this.id, this.el.nativeElement.type !== 'password');

    this.service
      .getObservable(this.id)
      .subscribe((show) =>
        this.renderer.setAttribute(this.el.nativeElement, 'type', show ? 'text' : 'password')
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
