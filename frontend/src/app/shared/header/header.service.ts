import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private state  = false;
  private message = new Subject<string>();
  constructor() { }

  public getState(){
    return this.state ;
  }

  public setState(msg:boolean){
    this.state = msg;
  }

  public getMessage():Observable<string>{
    return this.message.asObservable();
  }

  public setMessage(msg:string){
    return this.message.next(msg);
  }
}
