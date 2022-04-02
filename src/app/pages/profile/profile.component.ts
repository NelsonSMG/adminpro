import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _usuarioService : UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ){
    //console.log(usuario);
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe(resp => {
      console.log(resp);
    })

  }

}
