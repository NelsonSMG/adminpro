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
