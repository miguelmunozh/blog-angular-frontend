import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  loginRequestPayload : LoginRequestPayload;
  isError: boolean;
  
  constructor(
    private authservice : AuthService,
    private router :Router,
    private toastr : ToastrService,
    private activatedRoute : ActivatedRoute) { 

    this.loginRequestPayload = {
      username : '',
      password : ''
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required)
    });

    this.activatedRoute.queryParams.subscribe(params=>{
      if(params.registered !== undefined && params.registered === 'true'){
        this.toastr.success('sign up succesful');
      }
    })
  }

  login(){
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;


    const val = this.loginForm.value;

    if (!val.email && !val.password) {
        this.isError = true;
        return;
    }
    this.authservice.login(this.loginRequestPayload).subscribe(data=>{
      // if the response from the back end is not empty we go to the welcome page
      if(data){
        this.isError = false;
        this.router.navigateByUrl("/home");
        this.toastr.success('Login successful');
      }
    });
  }
}
