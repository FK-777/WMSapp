import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  loading: boolean;

  constructor(private router: Router, public formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.minLength(5), Validators.maxLength(100), Validators.required, Validators.pattern(emailReg)]],
    })
  }

  forgotPassword() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const email = this.forgotForm.get('email').value.toString();

    this.authenticationService
      .forgotPassword(email)
      .then(
        (response) => {
          console.log(response);

          this.loading = false;
          this.forgotForm.reset();

          if (response.success) {
            console.log("Please check your email to reset password!");
            //this.toastrService.success('Please check your email to reset password!', 'Success');
          }
        }).catch((response) => {
          console.log("======>", response);
          if (response.error && response.error.message) {
            console.log(response.error.message);
            
            //this.toastrService.error(response.error.message);
          }
          this.loading = false;
        });
  }

  emailError() {
    return this.forgotForm.controls.email.hasError('required') ? 'Valid email is required' :
      this.forgotForm.controls.email.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
        this.forgotForm.controls.email.hasError('minlength') ? 'Email is required of minimum length of 5 characters' :
          this.forgotForm.controls.email.hasError('pattern') ? 'Valid email is required' :
            '';
  }

}

