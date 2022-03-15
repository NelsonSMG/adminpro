import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swals: SweetAlert = _swal as any;

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  forma!: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public _router: Router
  ) {
    init_plugins();
  }

  sonIguales( campo1: string, campo2: string ) : ValidationErrors {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return false;
      }

      return {
        sonIguales: true
      };
    };
  }

  ngOnInit(): void {
    
    this.forma = new FormGroup({
        nombre: new FormControl( null , Validators.required ),
        correo: new FormControl( null , [Validators.required, Validators.email] ),
        password: new FormControl( null , Validators.required ),
        password2: new FormControl( null , Validators.required ),
        condiciones: new FormControl( false )
      }, this.sonIguales( 'password', 'password2' ) );

      this.forma.setValue({
        nombre: 'Test',
        correo: 'test@test.com',
        password: '123456',
        password2: '123456',
        condiciones: true
      });
  }

  registrarUsuario(){

    if(this.forma.invalid){
      return;
    } 

    if (!this.forma.value.condiciones){
      swals("Importante", "Debe de aceptar las condiciones", "warning");
      console.log("Debe de aceptar las condiciones");
      return
    }
    //console.log('form valido ', this.forma.valid);
    //console.log(this.forma.value);

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    )

    this._usuarioService.crearUsuario(usuario)
    .subscribe( resp => {
      console.log(resp);
      this._router.navigate(['/login']);
    })

  }

}
