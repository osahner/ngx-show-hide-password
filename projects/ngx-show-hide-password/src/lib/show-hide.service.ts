import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowHideService {
  private readonly _observable: Observable<boolean>;
  private subscriber: Subscriber<boolean>;
  private show = false;

  constructor() {
    this._observable = new Observable(subscriber => {
      this.subscriber = subscriber;
    }).pipe(share<boolean>());
  }

  public get observable(): Observable<boolean> {
    return this._observable;
  }

  public setShow(show: boolean) {
    this.show = show;
  }

  public getShow(): boolean {
    return this.show;
  }

  public toggle() {
    this.show = !this.show;
    this._next();
  }

  private _next() {
    if (this.subscriber) {
      this.subscriber.next(this.show);
    }
  }
}
