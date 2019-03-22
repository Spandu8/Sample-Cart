
import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;
  erroMessage: string;
  isError: boolean = false;
  constructor(private router: Router, public dialogRef: MatDialogRef<LoginComponent>,
    @Inject( MAT_DIALOG_DATA) data, private authService: AuthenticationService, private fb: FormBuilder) {
        console.log(data,'data');
   }


  ngOnInit() {
    this.initializeForm();
  }


    initializeForm() {
      this.formData = this.fb.group({
        userName: [''],
        password: ['']
      });
    }

  onSubmit() {

    console.log(this.formData,'data')
    const user = {
      userName: this.formData.value.userName,
      password: this.formData.value.password
    }
    this.authService.login(user).subscribe((response) => {
      if(response.code === 403){
        this.isError = true;
        this.erroMessage = response.message;

      }else{
        this.isError = false;
        this.router.navigate(['/home']);
        this.close();

      }

      console.log(response,'response');
    },(error) => {
      console.log(error,'error')
    });
  }

  close() {
    this.dialogRef.close();
  }

}
