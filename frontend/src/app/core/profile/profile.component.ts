import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Users } from 'src/app/shared/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : Users[] = []
  constructor(private apiService : ApiService, private route : Router) { }

  ngOnInit(): void {
    this.apiService.getProfile().subscribe(res=>{
      this.user = res;
      if(res.length == undefined){
        this.route.navigate(['/login']);
      }
      console.log(this.user)
    })

  }

  updateProfile(){
    console.log(this.user)
    this.apiService.updateUser(this.user).subscribe(res =>{
      this.apiService.getProfile().subscribe(res=>{
        this.user = res;
        this.apiService.setCurrentUser(this.user);
        window.location.reload();
      })
    })
  }

  deleteProfile(){
    this.apiService.deleteUser(this.user[0]._id).subscribe(res =>{
      this.apiService.logout();
      this.route.navigate(['/login']);
    })
  }

  logout(){
    this.apiService.logout();
    this.route.navigate(['/login']);
  }

}
