import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-url-dialog',
  templateUrl: './url-dialog.component.html',
  styleUrls: ['./url-dialog.component.scss']
})
export class UrlDialogComponent implements OnInit {

  urlString = new FormControl('', Validators.required);
  
  constructor(
    public dialogRef: MatDialogRef<UrlDialogComponent>,
  ) { }

  ngOnInit(): void {
    
  }

  generarEnlace(){
    this.urlString.setValue("http:4200/Auth/XX11122313156")
  }

  onTerminate(){
    this.dialogRef.close({event:"cancel"});
  }



}
