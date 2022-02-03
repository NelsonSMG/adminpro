import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress')
  txtProgress!: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter(); 

  constructor() { 
  }

  ngOnInit(): void {
  }

  onChange( newValue: number) {

    console.log(newValue);

    // let elemtHTML: any = document.getElementsByName("porcentaje")[0];
    // // console.log(elemtHTML.value);

    console.log(this.txtProgress);


    if(newValue >= 100){
      this.porcentaje=100;
    } else if (newValue <= 0){
      this.porcentaje=0;
    } else {
      this.porcentaje = newValue
    }

    // elemtHTML.value = Number(this.porcentaje);
    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambioValor.emit(this.porcentaje)

  }

  cambiarValor( valor: number ){

    if (this.porcentaje + valor > 100 ){
      return;
    }
    if (this.porcentaje + valor < 0 ){
      return;
    }

    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje)

    this.txtProgress.nativeElement.focus();

  }

}
