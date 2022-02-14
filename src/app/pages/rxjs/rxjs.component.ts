import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Observable, retry, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy  {

  private subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    // .pipe(
    //   retry(2)
    // )
    .subscribe(
      numero => console.log("Subs ", numero),
      (error: any) => console.log("Error en el rxjs ", error),
      () => console.log("El observador termino!")
    );

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      console.log("La pagina se va a cerrar");
      this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    
    return new Observable( (observer: Subscriber<any>) =>{

      let contador = 0;

      let intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        }

        observer.next(salida);

        // if (contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2){
        //   observer.error('Auxilio Auxilio');
        // }

      },1000);

    }).pipe(

      map( resp => {

        return resp.valor;

      }),
      filter( (valor, index)=> {
        //console.log("Filter, ", valor, index);

        if ((valor%2)===1){
          //impar
          return true;
        } else {
          //par
          return false;
        }

      })

    )

  }

}
