import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth.service';

import decode from 'jwt-decode'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private user:Auth ={
    nombre: '',
    contrasena: ''
  }
  private user_data!:User
  authForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.authForm = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    })
  }
    
  ngOnInit(){
    //this.validateForm(this.authForm)
  }


  validateForm(){
    this.user = this.authForm.value
    this.authService.signin(this.user).subscribe( (res:any) =>{
      localStorage.setItem('token', res.token)
      this.user_data = decode(res.token || "")
      if(this.user_data.id_perfil == 1){
        this.router.navigate(['dashboard']) //dashboard
      }else{
        this.router.navigate(['dashboard/view']) //view documents
      }


      
    })
  }  

  onSubmit(): void {
    this.router.navigate([''])
  }

}
