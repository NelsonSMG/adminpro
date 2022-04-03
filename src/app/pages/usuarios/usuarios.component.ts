import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swals: SweetAlert = _swal as any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService : UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
  
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe( (resp:any) => {
      //console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.users;
      //console.log(this.usuarios);
      this.cargando = false;

    } );
  }

  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
    //console.log(desde)

    if (desde >= this.totalRegistros){
      return;
    }

    if (desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios()

  }

  buscarUsuarios(termino : string){
    //console.log(termino);

    if (termino.length <= 0){
      this.cargarUsuarios();
      return
    }

    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
    .subscribe( ( usuarios: Usuario[] ) => {
      //console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    } );
  }

  guardarUsuario(usuario: Usuario){
    console.log(usuario);
    this._usuarioService.actualizarUsuario(usuario)
    .subscribe();

  }

  borrarUsuario(usuario: Usuario){
    console.log(usuario);
    if (usuario._id == this._usuarioService.usuario._id){
      swals('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }

    swals({
      title: "Estas seguro ?",
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
    .then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe( ( resp: any ) => {
          console.log(resp);
          this.cargarUsuarios();
        } );
        swals("Usuario borrado correctamente", {
          icon: "success",
        });
        return true;

      } else {
        swals("El usuario no fue borrado!");
        return false
      }
    });

  }

}
