import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

interface IState {
  id: string;
  show: boolean;
  subject: Subject<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class ShowHideService {
  private readonly states: IState[] = [];

  constructor() {}

  private getIO(id: string): IState {
    let io = this.states.find((o) => o.id === id);
    if (!io) {
      io = this.init(id);
    }
    return io;
  }

  private init(id: string): IState {
    const subject = new ReplaySubject<boolean>(1);
    const io = {
      id,
      show: false,
      subject,
    };
    this.states.push(io);
    return io;
  }

  private saveAndProadcast(io: IState, show: boolean) {
    io.show = show;
    io.subject.next(io.show);
  }

  public getObservable(id: string): Observable<boolean> {
    return this.getIO(id).subject;
  }

  public setShow(id: string, show: boolean): void {
    this.saveAndProadcast(this.getIO(id), show);
  }

  public toggleShow(id: string): void {
    const io = this.getIO(id);
    this.saveAndProadcast(io, !io.show);
  }
}
