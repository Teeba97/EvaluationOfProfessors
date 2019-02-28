import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ilecturer } from '../models/lecturers';

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

  private getUrl = "http://localhost/api/lecturers/select.php";
  private deleteUrl = "http://localhost/api/lecturers/delete.php";
  private addUrl = "http://localhost/api/lecturers/add.php";
  private getUnEvaluatedUrl = "http://localhost/api/lecturers/evaluation_lec.php"

  constructor( private http: HttpClient ) { 

  }

  get( info ): Observable<Ilecturer[]> {
    return this.http.post<Ilecturer[]>( this.getUrl , info );
  }

  delete( lecturer ) {
    return this.http.post( this.deleteUrl , lecturer );
  }

  add( lecturer ) {
    return this.http.post( this.addUrl , lecturer );
  }

  getUnEvaluatedLec( info ): Observable<Ilecturer[]> {
    return this.http.post<Ilecturer[]>( this.getUnEvaluatedUrl , info );
  }

}