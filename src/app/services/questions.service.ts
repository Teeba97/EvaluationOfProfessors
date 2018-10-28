import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private getUrl = "http://localhost/api/questions/select.php";
  private deleteUrl = "http://localhost/api/questions/delete.php";
  private addUrl = "http://localhost/api/questions/add_q.php";
  
  constructor( private http: HttpClient ) { 

  }

  get(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>( this.getUrl );
  }

  delete( question ) {
    return this.http.post( this.deleteUrl , question );
  }

  add( question ) {
    return this.http.post( this.addUrl , question );
  }

}
