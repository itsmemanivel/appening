import { Component, OnInit, Inject } from '@angular/core';
import { HeaderService } from 'src/app/shared/header/header.service';
import { ApiService } from 'src/app/shared/services/api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Users, Posts } from '../../../shared/models'



import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value:any) {
      if (!value) return;

      return value.reverse();
    }
}


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  users : Users[] = [];
  posts : Posts[] = [];
  posts1 : Posts = {} as Posts;

  title:any;
  imageURL:any;
  content:any;

  constructor(private toggleService: HeaderService, private apiService: ApiService,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.toggleService.setState(false);


    this.apiService.readPost().subscribe((res)=>{
      this.posts = res;
      console.log(this.posts);
    })

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {title: this.title, imageURL: this.imageURL, content: this.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.posts1 = result;

      this.apiService.addPost(this.posts1).subscribe(res =>{
        window.location.reload();
      })
    });
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  
      <div mat-dialog-content>
      <mat-form-field style="width:100%">
        <mat-label>Title</mat-label>
        <input  matInput [(ngModel)]="data.title">
      </mat-form-field>

      <mat-form-field style="width:100%">
        <mat-label>Image</mat-label>
        <input matInput [(ngModel)]="data.imageURL">
      </mat-form-field>

      <mat-form-field style="width:100%">
        <mat-label>Content</mat-label>
        <textarea matInput [(ngModel)]="data.content"></textarea>
      </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onClose()">No Thanks</button>
        <button *ngIf="data.title && data.imageURL && data.content" mat-raised-button color="accent" [mat-dialog-close]="data" cdkFocusInitial>Ok</button>
      </div>


  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Posts) {}

  onClose(): void {
    this.dialogRef.close();
  }

}
