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

  actualizarUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);
    
    return this.http.put(url, usuario)
    .pipe(
      map( (resp: any) => {
        //this.usuario = resp.usuario;

        if (usuario._id == this.usuario._id){
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }
 
        swals("Usuario actualizado", usuario.nombre, "success");
        return true;

      })
    )
  }

  cargarUsuarios( desde: number = 0 ){

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);

  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.usuarios;
      })
    )
  }

  borrarUsuario(id: string){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    console.log(url);
    return this.http.delete(url)
  }


}
