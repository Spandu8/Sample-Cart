import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
productFormData: FormGroup;
  constructor( public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder, private authService:AuthenticationService) {
        console.log(data,'data');
   }

   ngOnInit() {
     this.initializeForm();
   }

   initializeForm() {
       this.productFormData = this.fb.group({
         name: [''],
         amount: ['']
       });
   }

   addProduct() {
     const productInfo = {
       name: this.productFormData.value.name,
       amount: this.productFormData.value.amount
     }
     this.authService.addProduct(productInfo).subscribe((response) => {
       this.close();
     },(error)=> {
       console.log(error,'error')
     })

   }

   close() {
     this.dialogRef.close();
   }

}
