import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './authentication.service';
import {  Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular';
  cartLength: any = [];
  user$: Observable<any>;

  constructor(public dialog:MatDialog, private authService: AuthenticationService) { }

  ngOnInit() {    
     this.user$ = this.authService.getUserDetails;
     this.user$.subscribe(val => {
       if(val) {
          this.getCart();
        }  
     });
     this.authService.CartState
         .subscribe((state) => {
            this.getCart();
     });
   }

  logout(){
      this.authService.logOut();
  }

  getCart() {
      this.authService.getCartDetails().subscribe((res) => {
            this.cartLength = res.length;
      });
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
 openRegisterDialog():void {
   const registerDialogConfig = new MatDialogConfig();
   registerDialogConfig.disableClose = true;
   registerDialogConfig.autoFocus = true;

   registerDialogConfig.width = '600px';
   registerDialogConfig.height = '400px';
   const registerDialogRef = this.dialog.open(RegisterComponent, registerDialogConfig);

   registerDialogRef.afterClosed().subscribe(
     data => console.log("Dialog output:", data)
   );
 }

}
