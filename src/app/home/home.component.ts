import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProductComponent} from '../product/product.component';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  productList :any = [];
  editProductFormData: FormGroup;
  isDisabled: boolean = true;


  constructor(public dialog:MatDialog, private authService:AuthenticationService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.initializeForm();
    this.getProducts();
  }

  initializeForm() {
      this.editProductFormData = this.fb.group({
        name: [''],
        amount: ['']
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
       console.log("Dialog output:", data)
     }
 );
 }


 getProducts(){
   this.authService.getProducts().subscribe((response) => {
     console.log(response,'response');
     this.productList = response;
   },(error)=> {
     console.log(error,'error')
   })

 }


}
