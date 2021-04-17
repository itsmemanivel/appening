import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : Users[] = [];
  email:string = '';
  password:string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    
    
  }

  login(){

    if(this.email && this.password){
    this.apiService.login(this.email, this.password);
  } else {
    alert("Please complete the fields")
  }
  }

}
