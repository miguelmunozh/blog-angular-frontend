import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignupRequestPayload } from '../sign-up/signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from '../login/login.request.payload';
import { LoginResponse } from '../login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localstorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload) : Observable <any>{
    return this.httpClient.post("http://localhost:8080/register",signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload:LoginRequestPayload):Observable <boolean>{

    return this.httpClient.post<LoginResponse>("http://localhost:8080/login", 
    loginRequestPayload).pipe(map(data=>{

      // set the session of the logged user
      this.localstorage.store('authentication', data.token);
      this.localstorage.store('username', data.username);
      this.localstorage.store('expiresAt', data.expiresAt);
    
      this.loggedIn.emit(true);
      this.username.emit(data.username);

      return true;
    }));
  }


  getJwtToken() {
    return this.localstorage.retrieve('authentication');
}

  getUsername(){
    return this.localstorage.retrieve('username');
  }

  logout() {
    this.loggedIn.emit(false);

    this.localstorage.clear("authentication");
    this.localstorage.clear("username");
    this.localstorage.clear("expiresAt");
  }

  // to know if the some html elements should be displayed or not
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

isLoggedOut() {
}

getExpiration() {
}    
}
