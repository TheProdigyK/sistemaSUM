import { Proceso } from './../models/proceso';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiblingSharedService {

  row!:Proceso

  constructor() { }

  setRowProcess(data: Proceso){ 
    this.row = data
  }

  //without observable
  getRowProcess(){
    return this.row
  }
  
}
