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

  validateForm(): void{
    this.authService.getAll()
      .subscribe(
        data =>{
          //this.user = data;
          console.log(data)
        },
        error => {}
      );
  }  

  onSubmit(): void {
    // display some fireworks
    console.log(this.authForm.value)
    this.router.navigate(['dashboard'])
  }

}
