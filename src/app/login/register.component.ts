import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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

  constructor() {
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
        nombre: 'Test ',
        correo: 'test@test.com',
        password: '123456',
        password2: '123456',
        condiciones: true
      });
  }

  registrarUsuario(){
    console.log('form valido ', this.forma.valid);
    console.log(this.forma.value);
  }

}
