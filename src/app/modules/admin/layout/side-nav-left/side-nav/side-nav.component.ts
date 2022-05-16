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
  private user?: User
  
  constructor() { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.user = decode(token || "")
    this.expectedRole = this.user.id_perfil || 2
  }

}
