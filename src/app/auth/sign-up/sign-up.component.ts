import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupRequestPayload : SignupRequestPayload;
  signupForm: FormGroup;
  isError: boolean;

  constructor(
    private authService: AuthService, 
    private router : Router, 
    private toastr : ToastrService) {  

    this.signupRequestPayload =({
      firstName:'',
      lastName:'',
      username:'',
      password:'',
      email:'',
      imageUrl:''
    })
  }

  ngOnInit(): void {
    this.signupForm =  new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl("", [Validators.required, Validators.email]),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)
    })
  }

  signup(){
    this.signupRequestPayload.firstName = this.signupForm.get('firstName')?.value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;

    const val = this.signupForm.value;

    if (!val.email && !val.password) {
        this.isError = true;
        return;
    }

    this.authService.signup(this.signupRequestPayload).subscribe((data)=>{
    if(data){
      this.router.navigate(['/log-in'], {queryParams : {
        registered : true } });

    }
    });
  }
}
