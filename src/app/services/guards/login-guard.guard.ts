import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( 
    public _usuarioService : UsuarioService,
    public router : Router ) {
    
  }

  canActivate():  boolean  {

    console.log(this._usuarioService.estaLogueado())


    if ( this._usuarioService.estaLogueado()){
      console.log("Paso por el login guard");
      return true;
    } else {
      console.log("Bloqueado por el guard");
      this.router.navigate(['/login']);
      return false; 
    }

    
  }
}
