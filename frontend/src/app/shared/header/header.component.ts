import { Component, OnInit, AfterViewInit, AfterViewChecked, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  state:boolean= false;
  data:string='';
  constructor(private stateService: HeaderService) { }



  checkState(){
  
    this.state = this.stateService.getState();
  
   }

   
  ngOnInit(): void {
    setInterval(()=>{
      this.checkState();
    }, 100);
  }

  

}