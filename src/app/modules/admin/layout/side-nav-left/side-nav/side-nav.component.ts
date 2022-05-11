import { childRoutes } from './../../../child-routes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  showMenu = false;
  routes = childRoutes;
  constructor() { }

  ngOnInit(): void {
  }

}