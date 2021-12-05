import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GLOBAL } from './global';
import { sha384 } from 'js-sha512';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public urlApi: string;
  public token;

  constructor(private _http: HttpClient) {
      this.urlApi = GLOBAL.url;
      this.token = sha384('JESUSDIA' + new Date().toISOString().split('T')[0].replace(/-/g, ''));
      
      //Descomentar esta linea en caso de que la anterior no funcione, modificando el dia y el mes
      //a la fecha actual en la que ejecutamos el programa
      //this.token = sha384('JESUSDIA' + "20211205");
      
   }

   //Metodo para hacer peticion HTTP al API y obtener las tareas
   getTareas(): Observable<any> {
    let headers = new HttpHeaders()
      .set('X-Auth', this.token)
      .set('funcion', "getTareas");
    return this._http.get(this.urlApi, {headers: headers});
  }

  //Metodo para hacer peticion HTTP al API y obtener los estados
  getEstados(): Observable<any> {
    let headers = new HttpHeaders()
      .set('X-Auth', this.token)
      .set('funcion', "getEstados");
    return this._http.get(this.urlApi, {headers: headers});
  }

  //Metodo para hacer peticion HTTP al API y obtener los estados
  getTipos(): Observable<any> {
    let headers = new HttpHeaders()
      .set('X-Auth', this.token)
      .set('funcion', "getTipos");
    return this._http.get(this.urlApi, {headers: headers});
  }
}
