import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEvaluation } from '../models/evaluation';

@Injectable({
  providedIn: 'root'
})

export class EvaluationsService {

  addUrl = "http://localhost/api/evaluations/add.php"
  getUrl = "http://localhost/api/evaluations/select.php"

  constructor( private http: HttpClient ) { }

  get(): Observable<IEvaluation[]> {
    return this.http.get<IEvaluation[]>(this.getUrl)
  }

  add( data ) {
    return this.http.post( this.addUrl , data)
  }
  
}
