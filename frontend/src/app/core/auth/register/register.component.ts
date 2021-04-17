import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Users = {} as Users;
  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit(): void {


  }

  register(){

    console.log(this.user);
    if(this.user.email && this.user.password && this.user.username){
    this.apiService.addUser(this.user).subscribe(res=>{
      
      this.route.navigate(['/login']);
    })
    } else {
      alert('All fields are required!!!');
    }
  }

}
