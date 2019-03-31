import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { GrowlService } from 'ngx-growl';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errMessage: any;
  registerFormData: FormGroup;
    constructor( public dialogRef: MatDialogRef<RegisterComponent>,
      @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder, private authService:AuthenticationService, private growlService: GrowlService) {
     }


     ngOnInit() {

       this.initializeForm();
     }

     initializeForm() {
         this.registerFormData = this.fb.group({
           userName: [''],
           email: [''],
           password: ['']
         });
    }

    registerUser() {
      const user = {
        userName: this.registerFormData.value.userName,
        email: this.registerFormData.value.email,
        password: this.registerFormData.value.password,
        isAdmin: false
      }
      this.authService.registerUser(user).subscribe((response) => {
        console.log(response,'response')
        if(response.code === 400) {
          this.errMessage = response.message;
        }else{
          this.errMessage = '';
          this.close();
          this.growlService.addSuccess({
            message: 'User Registered Successfully'
          });
        }
      },(error)=> {
      })
    }

  close() {

    this.dialogRef.close();
  }

}
