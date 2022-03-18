import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

declare function init_plugins(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  email: string = "";
  recuerdame: boolean = false;

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
    init_plugins()
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1){
      this.recuerdame =  true;
    }
  }

  ingresar( forma: NgForm ){

    if (forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password)
      
    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe( resp => this.router.navigate(['/dashboard']) );

    //console.log(forma.value);
    //this.router.navigate(['/dashboard']);
  }

}
