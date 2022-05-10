import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: User = {
    id_usuario: '',
    id_perfil: '',
    CI: '',    
    nombre: '',
    contrasena: ''
  }
  user_name = '';
  authForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.authForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    })
  }
    
  ngOnInit(): void {
    //this.validateForm()
    
  }

  validateForm(user: string): void{
    this.authService.getUser(user)
      .subscribe(
        data =>{
          //this.user = data;
          console.log(data)
        },
        error => {
          console.log("error")
        }
      );
  }  

  onSubmit(): void {
    // display some fireworks
    this.user_name = this.authForm.get('usuario')?.value
    //console.log(this.user)
    this.router.navigate(['dashboard'])
    console.log(this.user_name)
    this.validateForm(this.user_name)
  }

}
