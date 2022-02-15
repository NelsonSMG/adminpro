import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { 

    let promesa = this.contarTres();

    promesa.then(
      mensaje => console.log('termino! ', mensaje)
    )
    .catch (error => console.error('Error en la promesa ', error));

  }

  ngOnInit(): void {
  }

  contarTres(){

    return new Promise<Boolean>( (resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval( ()=>{

        contador += 1;
        console.log(contador);
        
        if (contador===3){
          resolve(true);
          //reject('Error con el intervalo');
          clearInterval(intervalo);
        }

      }, 1000);

    });

  }

}
