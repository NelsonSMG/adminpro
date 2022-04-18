import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swals: SweetAlert = _swal as any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService : HospitalService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales()
    .subscribe(hospitales => this.hospitales = hospitales);
  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
            .subscribe( hospitales => this.hospitales = hospitales );

  }

  crearHospital() {

    swals({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your password",
          type: "text",
        },
      },
      icon: 'info',
      buttons: [true, true],
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
              .subscribe( () => this.cargarHospitales() );

    });

  }


  guardarHospital( hospital: Hospital) {

    this._hospitalService.actualizarHospital( hospital )
            .subscribe();

  }

  borrarHospital( hospital: Hospital ) {

    this._hospitalService.borrarHospital( hospital._id )
            .subscribe( () =>  this.cargarHospitales() );

  }

}
