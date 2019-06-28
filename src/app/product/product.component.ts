import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
productFormData: FormGroup;

  constructor( public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder, private authService:AuthenticationService) {
    
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
     const formData = new FormData();
     formData.append('name', this.productFormData.value.name);
     formData.append('amount', this.productFormData.value.amount);    
     this.authService.addProduct(formData).subscribe((response) => {
       this.close();
     },(error)=> {
     })

   }

   close() {
     this.dialogRef.close();
   }

}
