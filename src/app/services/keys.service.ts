import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ikeys } from '../models/keys';
@Injectable({
  providedIn: 'root'
})
export class KeysService {

  private getUrl = "http://localhost/api/login_keys/select.php";
  private deleteUrl = "http://localhost/api/login_keys/delete.php";
  private addUrl = "http://localhost/api/login_keys/add.php";

  constructor(private http: HttpClient) { }
    get(): Observable<Ikeys[]> {
      return this.http.get<Ikeys[]>( this.getUrl );
    }
  
    delete( lecturer ) {
      return this.http.post( this.deleteUrl , lecturer );
    }
  
    add( lecturer ) {
      return this.http.post( this.addUrl , lecturer );
  }
}
