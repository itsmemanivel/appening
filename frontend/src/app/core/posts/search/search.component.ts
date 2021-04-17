import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/shared/header/header.service';
import { Posts } from 'src/app/shared/models';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  id:any;
  posts: Posts[] =[];
  state:boolean= true;
  data:string='';
  error:boolean = false;

  constructor( private activatedRoute : ActivatedRoute, private stateService: HeaderService, private apiService : ApiService) { }


  changeDetection(){

    this.stateService.getMessage().subscribe(res=>{
      console.log(res);
    });
  }

  search(){
    var msg:any = this.stateService.getMessage();
    this.apiService.searchPost(msg).subscribe(res =>{
       if(res != null){
         this.apiService.searchPost(res).subscribe(res=>{
          this.posts = res;
          console.log(this.posts);
         })
       }
    })
  }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params =>{
      this.id = params.get('id');
      if(this.id != null){
        console.log(this.id);
        this.stateService.setState(true);
      }
  
    });

    // setInterval(()=>{
    //   this.changeDetection();
    //   this.search();
    // }, 1000);

  }


  searchText(event:any){
    console.log(event);

    if(event.length > 0){
      this.error = false;
      this.apiService.searchPost(event).subscribe(res=>{
        this.posts = res;
        if(res.length < 1){
          this.posts = [] ;
          this.error = true
        }
      })
    } else {
      this.posts = [] ;
      this.error = true
    }
  }

  


  

}
