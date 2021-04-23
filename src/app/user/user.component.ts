import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from './user-model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username : string;
  userModel : UserModel;
  constructor(private userService : UserService, private route : ActivatedRoute) {
    // get username
   this.route.params.subscribe(data=>{
      this.username = data['username'];
   });

   // get the user info from server, to display in user component
   this.userService.getUserByUsername(this.username).subscribe(data=>{
    this.userModel = data;
   })

    
   }

  ngOnInit(): void {
  }

}
