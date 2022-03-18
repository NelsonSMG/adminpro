import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { filter, map, Observable, retry, Subscriber, Subscription } from 'rxjs';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swals: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio de usuario listo');
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

        localStorage.setItem("id", resp.id);
        localStorage.setItem("token", resp.token);
        localStorage.setItem("usuario", JSON.stringify(resp.usuario) );
        return true;

      })
    )

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
