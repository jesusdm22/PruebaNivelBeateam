import { HttpClient } from '@angular/common/http';
import { Component, PipeTransform, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ApiService } from './services/api.service';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {


  title = 'TestCandidatura';
  arrayTareas: any = [];
  arrayEstados: any = [];
  arrayTipos: any = [];
  cols: any[] = [];
  rowCount = 0;
  status: string;

  //Nos traemos la datatable de PrimeNG
  @ViewChild('dt') dt: Table | undefined;


  constructor(private _apiService: ApiService, private _formBuilder: FormBuilder) {
    this.status = "Todo va bien. No hay errores de conexión";
    
  }


  ngOnInit() {
    //Recogemos las tareas
    this.getTareas("");
    //Recogemos los estados
    this.getEstados();
    //Recogemos los tipos
    this.getTipos();
    //Establecemos las columnas de la tabla
    this.cols = [
      { field: 'referencia', header: 'PRODUCTO' },
      { field: 'cantidad', header: 'Q' },
      { field: 'estado', header: 'ESTADO' },
      { field: 'tipo', header: 'TIPO' },
      { field: 'fecha', header: 'FECHA' },
      { field: 'alias_cliente', header: 'CLIENTE' }
    ];
  }


  //Esta funcion se traera las tareas que hay en la DB
  getTareas(params): any {
    this._apiService.getTareas(params).subscribe(
      response => {
        this.arrayTareas = response.data;
        this.rowCount = this.arrayTareas.length;
      },

      error => {
        this.status = "No hemos podido recuperar la lista de tareas. Revisa que el servidor esté funcionando y el token sea correcto.";
      }
    );
  }

  //Esta funcion se traera los estados de la DB
  getEstados() {
    this._apiService.getEstados().subscribe(
      response => {
        console.log(response.data);
        this.arrayEstados = response.data;
      },
      error => {
        //Aqui tratamos errores
      }
    )
  }

  //Esta funcion se traera los estados de la DB
  getTipos() {
    this._apiService.getTipos().subscribe(
      response => {
        console.log(response.data);
        this.arrayTipos = response.data;

      },
      error => {
        //Aqui se tratan los errores
      }
    )
  }

  //Usaremos los filtros mediante las query string que podemos pasarle a la URL
  search(busqueda:NgForm):void {

    //Creamos variables para cada campo. Esto se puede mejorar creando un modelo de datos.
    let cliente = busqueda.value.cliente;
    let referencia = busqueda.value.referencia;
    let usuario = busqueda.value.usuario;
    let tipo = busqueda.value.tipo;
    //let estado = (<HTMLInputElement>document.getElementById('estado')).value;
    let fechaInicio = busqueda.value.fechaInicio;
    let fechaFin = busqueda.value.fechaFin;
    
    let params = "?cliente=" + cliente + 
                 "&referencia=" + referencia +
                 "&usuario=" + usuario;

    //Comprobamos si los filtros de tipo string estan vacios, puesto que dan problemas si los pasamos asi
    //Primero el tipo. Si NO está vacio, lo agregamos al queryString
    if(tipo != ""){
      params+="&tipo[]=" + tipo;
    }

    //Luego las fechas. Si las fechas NO están vacian, agregamos el rango al queryString
    if(fechaInicio != "" && fechaFin != ""){
      params += "&fecha[inicio]=" + fechaInicio + "&fecha[fin]=" + fechaFin;
    }

    /*Y por ultimo los estados. Si los check NO están vacios, lo agregamos al queryString
    if(estado != undefined){
      params+="&estado[]=" + estado;
    }*/

    //Por ultimo llamamos al metodo que rellena el array con los datos de la API pasandole los params
    this.getTareas(params);
  }


  clear(elemento: string){
    //Borramos el elemento
    (<HTMLInputElement>document.getElementById(elemento)).value = "";
    
    //Si el elemento era la fecha, borramos la de fin también
    if(elemento === 'fechaInicio'){
      (<HTMLInputElement>document.getElementById('fechaFin')).value = "";
    }
    
  }
}
