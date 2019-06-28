import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './authentication.service';
import {  Observable } from 'rxjs';
import {MatMenuModule} from '@angular/material/menu';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular';
  cartLength: any = [];
  notifications: any = [];
  user$: Observable<any>;
  showChat: boolean = false;
  receiverId: any = '';
  senderId: any = '';
  constructor(public dialog:MatDialog, private authService: AuthenticationService) { }

  ngOnInit() {    
     this.user$ = this.authService.getUserDetails;
     this.user$.subscribe(val => {
     this.showChat = val.isAdmin ? false : true;
      if(val) {
          this.getCart();
        }  
     });
     this.authService.CartState
         .subscribe((state) => {
            this.getCart();
     });
     this.authService.Notification.subscribe((data) => {     
     let isIdexist = this.notifications.findIndex(val => val.senderId === data.senderId);
      if(isIdexist!= -1) {
          this.notifications[isIdexist] = data;
      } else {
        this.notifications.push(data);
      }        
     })
   }

  logout(){
      this.authService.logOut();
  }

  getCart() {
      this.authService.getCartDetails().subscribe((res) => {
            this.cartLength = res.length;
      });
  }

  showChatBox(message) {
    this.showChat = true;
    this.receiverId = message.receiverId;
    this.senderId = message.senderId;
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
