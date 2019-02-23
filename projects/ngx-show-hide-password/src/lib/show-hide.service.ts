import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { share } from 'rxjs/operators';

interface IO {
  id: string;
  show: boolean;
  observable: Observable<boolean>;
  subscriber?: Subscriber<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ShowHideService {
  private readonly observables = [];

  constructor() {}

  private getIO(id: string): IO {
    let io = this.observables.find(o => o.id === id);
    if (!io && id) {
      io = this.init(id);
    }
    return io;
  }

  private init(id: string, show: boolean = false): IO {
    const observable = new Observable(subscriber => {
      this.getIO(id).subscriber = subscriber; // looks dangerous
    }).pipe(share<boolean>());
    const io = {
      id,
      show,
      observable
    };
    this.observables.push(io);
    return io;
  }

  public getObservable(id: string): Observable<boolean> {
    return this.getIO(id).observable;
  }

  public getShow(id: string): boolean {
    return this.getIO(id).show;
  }

  public setShow(id: string, show: boolean): void {
    this.getIO(id).show = show;
  }

  public toggle(id: string) {
    this.getIO(id).show = !this.getIO(id).show;
    this._next(id);
  }

  private _next(id: string) {
    if (this.getIO(id).subscriber) {
      this.getIO(id).subscriber.next(this.getIO(id).show);
    }
  }
}
