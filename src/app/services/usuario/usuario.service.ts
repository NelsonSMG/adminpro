import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';

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

    let url = URL_SERVICIOS + '/usuarios'
    
    return this.http.post(url, usuario);

  }

}
