import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http : HttpClient) { }

  getUserByUsername(username: string) : Observable<UserModel> {
    return this.http.get<UserModel>('http://localhost:8080/user/'+username);
  }
}
