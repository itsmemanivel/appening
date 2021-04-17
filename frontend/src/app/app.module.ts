import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


// componenets
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { ReadComponent, DialogOverviewExampleDialog, ReversePipe } from './core/posts/read/read.component';
import { SearchComponent } from './core/posts/search/search.component';
import { ProfileComponent } from './core/profile/profile.component';
import { HeaderComponent } from './shared/header/header.component';


// service
import { ApiService } from './shared/services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderService } from './shared/header/header.service';


// material themes
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ReadComponent,
    SearchComponent,
    HeaderComponent,
    ProfileComponent,
    DialogOverviewExampleDialog,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule

  ],
  providers: [ ApiService, HeaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
