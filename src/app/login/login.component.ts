
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
        sessionStorage.setItem('isAdmin', response.isAdmin);
        sessionStorage.setItem('isLoggedIn','true');
        sessionStorage.setItem('user', JSON.stringify(response));

        if(response.isAdmin) {
          this.authService.setIsAdmin(true);
        }else{
          this.authService.setIsAdmin(false);
        }
        this.authService.setIsLoggedIn(true);
        this.router.navigate(['/home']);
        this.close();

      }
    },(error) => {
    });
  }

  close() {
    this.dialogRef.close();
  }

}
