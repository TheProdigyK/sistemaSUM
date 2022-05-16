import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private user?: User
  constructor(
    private authService: AuthService,
    public router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot){
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');
    this.user = decode(token || "")

    if(!this.authService.isAuth() || this.user.id_usuario !== expectedRole){
      console.log("usuario no autorizado para la vista");
      this.router.navigate(['Auth'])
      return false
      
    }
    return true;
  }

  
  
}
