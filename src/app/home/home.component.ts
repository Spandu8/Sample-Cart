import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProductComponent} from '../product/product.component';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productList :any = [];
  editProductFormData: FormGroup;
  isDisabled: boolean = true;
  myForm : NgForm;

  constructor(public dialog:MatDialog, private authService:AuthenticationService, private fb: FormBuilder,) { }

  ngOnInit() {
    // this.initializeForm();
    this.getProducts();
  }

  // initializeForm() {
  //     this.editProductFormData = this.fb.group({
  //       name: [''],
  //       amount: ['']
  //     });
  // }

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
       console.log("Dialog output:", data)
     }
 );
 }


 getProducts(){
   this.productList = [];
   this.authService.getProducts().subscribe((response) => {
     response.forEach((list)=> {
       console.log(list,'list')
       list.isDisabled= true;
       this.productList.push(list);

     })
     console.log(this.productList,'response');

   },(error)=> {
     console.log(error,'error')
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
    console.log(product,'here')
    this.productList.forEach((list)=>{
      if(list._id === product._id){
        list.isDisabled = true;
      }
    });
  }

 updateProduct(product){
   console.log(product,'value');
   const productInfo = {
     amount: product.amount,
     name: product.name,
     _id: productInfo._id
   }
   this.authService.updateProduct(productInfo).subscribe((res)=>{
     console.log("updated");
     this.getProducts();
   })
 }


}
