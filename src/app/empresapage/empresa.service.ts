import { Empresa } from './empresa';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  list:Observable<Empresa[]> = new Observable();


  empresa:Subject<Empresa> = new Subject<Empresa>();

  constructor(private httpClient: HttpClient) { }

  private apiURL = "https://localhost:44343/api/empresas/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getAll(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(this.apiURL)
  }

  GetById(id:number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(this.apiURL + id)

  }

  create(empresa:Empresa): Observable<Empresa> {
    return this.httpClient.post<Empresa>(this.apiURL, JSON.stringify(empresa), this.httpOptions)

  }

  update(id:number, empresa:Empresa): Observable<Empresa> {
    return this.httpClient.put<Empresa>(this.apiURL + id, JSON.stringify(empresa), this.httpOptions)

  }

  delete(id:number){
    return this.httpClient.delete<Empresa>(this.apiURL + id, this.httpOptions)

  }



}
