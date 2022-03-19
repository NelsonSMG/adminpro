import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { filter, map, Observable, retry, Subscriber, Subscription } from 'rxjs';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
const swals: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token!: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    console.log('Servicio de usuario listo');
    this,this.cargarStorage();
   }

  cargarStorage(){
    if ( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id : string, token : string, usuario : Usuario ){

    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
    
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    
    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ){
    
    if (recordar){
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + '/login'
    
    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {

        this.guardarStorage( resp.id, resp.token, resp.usuario);

        return true;

      })
    )

  }

  estaLogueado(){
    return (this.token.length > 5)? true : false;
  }

  crearUsuario( usuario: Usuario ){

    let url = URL_SERVICIOS + '/usuario'
    
    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {

        swals("Usuario creado", usuario.email, "success");
        return resp.usuario;

      })
    )

  }


}
