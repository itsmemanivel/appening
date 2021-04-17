import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Users , Posts } from '../models';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // url: string = 'http://localhost:5000/api_v1'; //development
  url: string = 'https://doofie.herokuapp.com/api_v1'; //production


  user : Users[] = [];
  currentUser : any;
  constructor(private http: HttpClient, private route: Router) { }


  /*
  
  :::::::::::::::::::::USERS REST API::::::::::::::::::::::::::::::::::::
  
  */


  addUser(user: Users):Observable<Users[]> {

    return  this.http.post<Users[]>(this.url+ '/auth/add', user);
  }

  login(email:string, password:string) {

    var body = {
      email : email,
      password : password
    }
    this.http.post<any>(this.url+ '/auth/login', body).subscribe(res=>{
      if(res.length == undefined){
        alert(`Incorrect Email or Password!!!`)
      } else {
        
        this.setCurrentUser(res);
       this.route.navigate(['/my-account']);
      }
    });
  }

  setCurrentUser(user:any){
    this.user = user;
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(this.user[0]));

  }

  getCurrentUser(){

  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return this.currentUser;
  }

  getProfile():Observable<Users[]> {

    let id = this.getCurrentUser()._id;
    return  this.http.get<Users[]>(this.url+ '/auth/profile/'+ id);
  }

  logout(){
    return localStorage.removeItem('currentUser')
  }

  searchUser(str: string):Observable<any> {

    return  this.http.get<Users[]>(this.url+ '/auth/search/' + str);
  }

  updateUser(user: Users[]):Observable<Users[]> {

    console.log(user);
    return  this.http.post<Users[]>(this.url+ '/auth/update', user);
  }

  deleteUser(id: string):Observable<string> {

    return  this.http.delete<string>(this.url+ '/auth/delete/'+ id);
  }

  


   /*
  
  :::::::::::::::::::::POSTs REST API::::::::::::::::::::::::::::::::::::
  
  */




  addPost(post: Posts):Observable<Posts[]> {

    return  this.http.post<Posts[]>(this.url+ '/posts/add', post);
  }

  readPost():Observable<Posts[]> {

    return  this.http.get<Posts[]>(this.url+ '/posts/read');
  }

  searchPost(str: string):Observable<any> {

    return  this.http.get<Posts[]>(this.url+ '/posts/search/' + str);
  }

  deletePost(id: string):Observable<string> {

    return  this.http.delete<string>(this.url+ '/posts/delete/'+ id);
  }


}
