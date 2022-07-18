import { Router } from '@angular/router';
import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();
  dark = true;
  constructor(
    private readonly router: Router
  ) { }

  @HostBinding('class')
  get themeModel() {
    return this.dark ? "theme-dark" : "theme-light"
  }

  ngOnInit(): void {
  }

  toggleSideBar(): void{
    this.sideNavToggled.emit();
  }

  onLoggedout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/'])
  }

}
