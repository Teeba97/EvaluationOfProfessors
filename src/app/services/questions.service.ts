import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion  } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private getUrl = "http://localhost/api/questions/select.php";
  private deleteUrl = "http://localhost/api/questions/delete.php";
  private addUrl = "http://localhost/api/questions/add.php";
  private editUrl = "http://localhost/api/questions/edit.php";
  private numOfQUrl = "http://localhost/api/questions/num_of_q.php";
  
  constructor( private http: HttpClient ) { 

  }

  get(): Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>( this.getUrl );
  }

  delete( item ) {
    return this.http.post( this.deleteUrl , item );
  }

  add( item ) {
    return this.http.post( this.addUrl , item );
  }

  edit( item ) {
    return this.http.post( this.editUrl , item );
  }

  getNumOfQ() {
    return this.http.get( this.numOfQUrl );
  }
  

}
