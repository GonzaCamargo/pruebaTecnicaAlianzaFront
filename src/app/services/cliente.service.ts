import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  rutaGlobal = 'http://localhost:8080/clientes/'

  constructor(private http:HttpClient) { }

  agregarCliente(cliente:Cliente){
    return this.http.post<Cliente>(`${baseUrl}/clientes/agregar`,cliente,{
      observe:'response'
    })
  }

  getAll(){
    return this.http.get<Cliente[]>(this.rutaGlobal+'mostrar');
  }

  modificarCliente(cliente:Cliente){
    return this.http.post<Cliente>(`${baseUrl}/clientes/modificar`,cliente,{
      observe:'response'
    })
  }

  eliminarCliente(id:number){
    return this.http.post(`${baseUrl}/clientes/`,id,{
      observe:'response'
    })
  }

  obtenerCliente(id: number){
    return this.http.get<Cliente>(`${baseUrl}/clientes/${id}`)
  }
}
