import { HttpClient } from '@angular/common/http';
import { Component, PipeTransform, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from './services/api.service';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {


  title = 'TestCandidatura';
  arrayTareas: any = [];
  arrayTareasAux: any = [];
  arrayEstados: any = [];
  arrayTipos: any = [];
  checkboxes: any = [];
  cols: any[] = [];
  rowCount = 0;
  //Nos traemos la datatable de PrimeNG
  @ViewChild('dt') dt: Table | undefined;


  constructor(private _apiService: ApiService) {
  }


  ngOnInit() {
    //Recogemos las tareas
    this.getTareas();
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
  getTareas(): any {
    this._apiService.getTareas().subscribe(
      response => {
        this.arrayTareas = response.data;
        this.rowCount = this.arrayTareas.length;
      },

      error => {
        //Aqui tratamos errores
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

  //---------------------------------------------------------
  // FILTROS ------------------------------------------------
  //---------------------------------------------------------
  filtroCliente(texto: string) {
    //Pasamos el texto a minuscula
    let textoMinuscula = texto.toLowerCase();

    //Aplicamos el filtro
    this.arrayTareas = this.arrayTareas.filter((tarea: any) =>
      //Le indicamos qué propiedad ha de filtrar
      tarea.alias_cliente.includes(textoMinuscula) || tarea.alias_cliente.toLowerCase().includes(textoMinuscula));

    //Sacamos el total de lineas despues del filtrado
    this.rowCount = this.arrayTareas.length;

    //Si la busqueda es vacia, por tanto el array queda vacio y sin resultados; 
    //Lo volvemos a cargar
    if (this.arrayTareas == "" || textoMinuscula == "") {
      this.arrayTareas = this.getTareas();
    }
  }

  filtroReferencia(texto: string) {
    //Pasamos el texto a minuscula
    let textoMinuscula = texto.toLowerCase();

    //Aplicamos el filtro
    this.arrayTareas = this.arrayTareas.filter((tarea: any) =>
      //Le indicamos qué propiedad ha de filtrar
      tarea.referencia.includes(textoMinuscula) || tarea.referencia.toLowerCase().includes(textoMinuscula));

    //Sacamos el total de lineas despues del filtrado
    this.rowCount = this.arrayTareas.length;

    //Si la busqueda es vacia, por tanto el array queda vacio y sin resultados; 
    //Lo volvemos a cargar
    if (this.arrayTareas == "" || textoMinuscula == "") {
      this.arrayTareas = this.getTareas();
    }
  }

  filtroUsuario(texto: string) {
    //Pasamos el texto a minuscula
    let textoMinuscula = texto.toLowerCase();

    //Aplicamos el filtro
    this.arrayTareas = this.arrayTareas.filter((tarea: any) =>
      //Le indicamos qué propiedad ha de filtrar
      tarea.usuario.toLowerCase().includes(textoMinuscula));

    //Sacamos el total de lineas despues del filtrado
    this.rowCount = this.arrayTareas.length;

    //Si la busqueda es vacia, por tanto el array queda vacio y sin resultados; 
    //Lo volvemos a cargar
    if (this.arrayTareas == "" || textoMinuscula == "") {
      this.arrayTareas = this.getTareas();
    }
  }


  filtroTipo(texto: string) {
    //Pasamos el texto a minuscula
    let textoMinuscula = texto.toLowerCase();

    //Esta busqueda la haremos si no esta seleccionado el filtro "Todos"
    if (textoMinuscula != "todos") {

      //LLamamos directamente a la API, pues el método local que hemos construido, re-setea 
      //"arrayTareas", y nos causará problemas de sobreescritura enla tabla
      this._apiService.getTareas().subscribe(
        response => {
          //Guardamos en un array auxiliar la respuesta de los datos
          this.arrayTareasAux = response.data;
          //Aplicamos el filtro sobre la lista auxiliar y lo pasamos a la tabla que se muestra
          this.arrayTareas = this.arrayTareasAux.filter((tarea: any) =>
            //Le indicamos qué propiedad tiene que filtrar
            tarea.tipo.toLowerCase().includes(textoMinuscula));
          //Sacamos el total de lineas despues del filtrado
          this.rowCount = this.arrayTareas.length;
        }
      );
    } else {
      this.arrayTareas = this.getTareas();
    }

  }


  filtroEstado(texto: string, evento: any) {
    //Pasamos el texto a minuscula
    let textoMinuscula = texto.toLowerCase();

    //Si el checkbox está marcado
    if (evento.target.checked) {
      //Guardamos en sesión el checkbox marcado para poder filtrar con varias opciones
      this.checkboxes.push(texto.toLocaleLowerCase());

      //LLamamos directamente a la API, pues el método local que hemos construido, re-setea 
      //"arrayTareas", y nos causará problemas de sobreescritura enla tabla
      this._apiService.getTareas().subscribe(
        response => {
          //Guardamos en un array auxiliar la respuesta de los datos
          this.arrayTareasAux = response.data;

          // Aplicamos el filtro sobre la lista auxiliar y lo pasamos a la tabla que se muestra
          this.arrayTareas = this.arrayTareasAux.filter((tarea: any) =>
            //Le indicamos qué propiedad tiene que filtrar
            tarea.estado.toLowerCase().includes(textoMinuscula));
          //Sacamos el total de lineas despues del filtrado
          this.rowCount = this.arrayTareas.length;

        });
    } else {
      //Si está desmarcado, eliminamos del array de checkboxes el filtro
      this.arrayTareas = this.getTareas();
    }
  }
}
