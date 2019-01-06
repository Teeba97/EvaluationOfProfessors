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
  EvaluationDoneUrl = "http://localhost/api/evaluations/sendEvaluationKey.php"
  removeLoginKeyUrl = "http://localhost/api/evaluations/removeLoginKey.php"
  
  constructor( private http: HttpClient ) { }

  get( info ): Observable<IEvaluation[]> {
    return this.http.post<IEvaluation[]>( this.getUrl, info)
  }

  add( data ) {
    return this.http.post( this.addUrl , data)
  }

  sendEvaluation( data ) {
    return this.http.post( this.EvaluationDoneUrl , data)
  }

  removeLoginKey( data ) {
    return this.http.post( this.removeLoginKeyUrl , data)
  }
  
}
