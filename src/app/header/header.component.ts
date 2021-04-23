import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn : boolean;
  username : string;

  
  constructor(
    private authService:AuthService, 
    private router : Router,
    private localstorage: LocalStorageService) {
    
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.localstorage.retrieve('username');
   }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUsername();

  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  logout() {
    // check if the token has expired
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

  getUsername(){
  }
}
