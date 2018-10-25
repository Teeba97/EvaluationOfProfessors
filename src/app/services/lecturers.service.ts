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
  
  constructor( private http: HttpClient ) { 

  }

  get(): Observable<Ilecturer[]> {
    return this.http.get<Ilecturer[]>( this.getUrl );
  }

  delete( item ) {
    return this.http.post( this.deleteUrl , item );
  }

  add( lecturer ) {
    return this.http.post( this.addUrl , lecturer );
  }

}