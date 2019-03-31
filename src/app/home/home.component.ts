import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProductComponent} from '../product/product.component';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import {  Observable } from 'rxjs';
import {MatButtonModule} from '@angular/material/button';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productList :any = [];
  isDisabled: boolean = true;
  myForm : NgForm;
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>;


  constructor(public dialog:MatDialog, private authService:AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.authService.getIsAdmin;
    this.getProducts();
    this.subscription = this.authService.CartState
        .subscribe((state : CartState) => {
          this.getProducts();
        });
  }


  addProductModal():void {
   const dialogConfig = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = '600px';
   dialogConfig.height = '400px';
   const dialogRef = this.dialog.open(ProductComponent, dialogConfig);

   dialogRef.afterClosed().subscribe(
     data => {
       this.getProducts();
     }
 );
 }

  addToCart(product) {
    const info = {
      productId: product._id,
      userId: JSON.parse(sessionStorage.getItem('user'))._id
    }
    this.authService.addTocart(info);
  }

 getProducts(){
   this.productList = [];
   this.authService.getProducts().subscribe((response) => {
     response.forEach((list)=> {
       list.isDisabled= true;
       this.productList.push(list);

     })
   },(error)=> {
   })

 }
  enableEdit(product){
    this.productList.forEach((list)=>{
      if(list._id === product._id){
        list.isDisabled = false;
      }
    });
  }

  cancelEdit(product){
    this.productList.forEach((list)=>{
      if(list._id === product._id){
        list.isDisabled = true;
      }
    });
  }

 updateProduct(product){
   const productInfo = {
     amount: product.amount,
     name: product.name,
     _id: product._id
   }
   this.authService.updateProduct(productInfo).subscribe((res)=>{
     this.getProducts();
   })
 }


}
