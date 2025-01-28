import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medico } from './Medico';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  url = 'http://localhost:5209/api/medico';


  constructor(private http: HttpClient) { }

  PegarMedicos(): Observable<Medico[]>{
    return this.http.get<Medico[]>(this.url);
  }

  PegarMedicoId(medicoId: number): Observable<Medico>{
    const apiUrl = `${this.url}/${medicoId}`;
    return this.http.get<Medico>(apiUrl);
  }

  SalvarMedico(medico: Medico) : Observable<any>{
    return this.http.post<Medico>(this.url,medico,httpOptions);
  }

  AtualizarMedico(medico: Medico) : Observable<any>{
    return this.http.put<Medico>(this.url,medico,httpOptions);
  }

  ExcluirMedico(medicoId: number): Observable<any>{
    const apiUrl = `${this.url}/${medicoId}`;
    return this.http.delete<number>(apiUrl,httpOptions);
  }
}
