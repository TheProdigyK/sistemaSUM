import { AuthService } from 'src/app/services/auth.service';
import { childRoutes } from './../../../child-routes';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode'
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  showMenu = false;
  routes = childRoutes;
  expectedRole = 2;
  private user!: User
  
  nombre_usuario!:string
  tipo_usuario!:string

  supersu:string = 'SUPERSU'

  constructor(
    private authServices:AuthService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.user = decode(token || "")
    this.expectedRole = this.user.id_perfil || 2
    
    if(this.user.id_perfil == 1){
      this.tipo_usuario = 'SUMARIANTE'
    }else{
      this.tipo_usuario = 'SUMARIADO'
    }
    this.obtenerNombre()
  }

  obtenerNombre(){
    if(this.user.ci != ""){
      this.authServices.getPersonaByCI(this.user.ci!).subscribe(
        data =>{
          
          this.nombre_usuario = data.appaterno + " " + data.apmaterno + " " + data.nombre
  
        }
  
      )
    }else{
      this.nombre_usuario = "SUPER USUARIO"
    }
    
  }

}
