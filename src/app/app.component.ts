import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import {  Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular';
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;


  constructor(public dialog:MatDialog, private authService: AuthenticationService) { }

   ngOnInit() {
     console.log("here", (JSON.parse(sessionStorage.getItem('user'))));

     this.isLoggedIn$ = this.authService.isLoggedIn;
     this.isAdmin$ = this.authService.getIsAdmin;
     console.log(this.isLoggedIn$,'this.isLoggedIn$')


   }

  logout(){
      this.authService.logOut();
  }

  openLoginDialog():void {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;

   dialogConfig.width = '600px';
   dialogConfig.height = '400px';
   const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

   dialogRef.afterClosed().subscribe(
     data => console.log("Dialog output:", data)
 );
 }
}
