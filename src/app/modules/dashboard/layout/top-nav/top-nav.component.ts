import { Router } from '@angular/router';
import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();
  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleSideBar(): void{
    this.sideNavToggled.emit();
  }

  onLoggedout(): void{
    localStorage.removeItem('liLoggedin');
    this.router.navigate(['/'])
  }

}
