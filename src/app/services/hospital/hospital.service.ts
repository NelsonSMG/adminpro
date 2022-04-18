import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
const swals: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0 ){

    let url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
    .pipe(
      map( (resp: any) => {
        
        this.totalHospitales = resp.total;
        return resp.hospitales;

      })
    )
  }

  obtenerHospital( id: number ){

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
    .pipe(
      map( (resp: any) => {
        return resp.hospital;
      })
    )

  }

  crearHospital( nombre: string ){

    let url = URL_SERVICIOS + '/hospital'
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, {nombre: nombre}).pipe(
      map( ((resp:any) => resp.hospital) ));

  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.put(url, hospital)
    .pipe(
      map( ((resp:any) => {
        swals("Hospital Actualizado", hospital.nombre, "success");
        return resp.hospital
      }) ));
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .pipe(
      map( (resp: any) => {
        
        swals("Hospital Borrado", '', "success");
        return true;

      })
    )
  }

  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.hospitales;
      })
    )
  }

}
