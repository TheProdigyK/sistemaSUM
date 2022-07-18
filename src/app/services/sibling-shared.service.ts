import { Proceso } from 'src/app/models/proceso';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiblingSharedService {

  row!:Proceso
  public row_data = new BehaviorSubject<any>("")
  currentProceso = this.row_data.asObservable()

  private data:any;

  constructor() { }

  sendProceso<Proceso>(data: Proceso){
    this.row_data.next(data)
  }

  setRowProcess(data: Proceso){ 
    this.row = data
  }

  //without observable
  getRowProcess(){
    return this.row
  }

  
  setData(data:any){
    this.data = data;
  }

  getData():any{
    return this.data;
  }

  
  
}
