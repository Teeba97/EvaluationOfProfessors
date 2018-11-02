import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EvaluationsService {

  addUrl = "http://localhost/api/evaluations/add.php"

  constructor( private http: HttpClient ) { }

  add( data ) {
    return this.http.post( this.addUrl , data)
  }
}
