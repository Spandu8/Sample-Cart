import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProductComponent} from '../product/product.component';
import { AuthenticationService } from '../authentication.service';
import { NgForm } from '@angular/forms';
import {  Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productList :any = [];
  isDisabled: boolean = true;
  myForm : NgForm;
  user$: Observable<any>;
  messageText: string;
  messages: Array<any>;
  constructor(public dialog:MatDialog, private authService:AuthenticationService) {
    
   }

  ngOnInit() {
    this.user$ = this.authService.getUserDetails;
    this.getProducts();
    this.authService.CartState
        .subscribe((state) => {
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
    this.authService.addTocart(info).subscribe(data => {
      console.log(data,'data')
    })
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

 deleteProduct(product) {
   this.authService.deleteProduct(product._id).subscribe((res) => {
     this.getProducts();
   })
 }


}
