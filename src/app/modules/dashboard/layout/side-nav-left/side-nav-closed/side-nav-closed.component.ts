import { childRoutes } from './../../../child-routes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-closed',
  templateUrl: './side-nav-closed.component.html',
  styleUrls: ['./side-nav-closed.component.css']
})
export class SideNavClosedComponent implements OnInit {
  showMenu = false;
  routes = childRoutes
  constructor() { }

  ngOnInit(): void {
  }

}
