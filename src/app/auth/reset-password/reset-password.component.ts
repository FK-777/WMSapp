import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading: boolean;
  initialVerificationDone = false;
  invalidLink = false;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder,
     private authenticationService: AuthenticationService) {
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!route.snapshot.params.email || !route.snapshot.params.verification || !emailReg.test(route.snapshot.params.email)) {
      this.invalidLink = true;
      return;
    }

    this.validateVerification();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    const passwordReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.minLength(8), Validators.maxLength(30), Validators.required, Validators.pattern(passwordReg)]],
      confirmPassword: ['', [Validators.minLength(8), Validators.maxLength(30), Validators.required]],
    })

  }

  validateVerification() {
    this.loading = true;
    this.authenticationService
      .forgotPasswordVerify(this.route.snapshot.params.verification)
      .then(
        (response) => {
          if (!response.success) {
            this.invalidLink = true;
          }

          this.initialVerificationDone = true;
          this.loading = false;
        }).catch((response) => {
          console.log("======>", response);
          if (response.error && response.error.message) {
            console.log(response.error.message);
            //this.toastrService.error(response.error.message);
          }
          this.initialVerificationDone = true;
          this.invalidLink = true;
          this.loading = false;
        });
  }

  resetPassword() {
    this.loading = true;
    this.authenticationService
      .resetPassword(this.route.snapshot.params.email, this.resetForm.value.password)
      .then(
        (response) => {
          if (!response.success) {
            this.invalidLink = true;
          }

          this.loading = false;
          this.resetForm.reset();
          console.log("Password changed");
          //this.toastrService.success("Password changed", "Success!");
          this.router.navigate(["/auth/login"]);
        }).catch((response) => {
          if (response.error && response.error.message) {
            console.log(response.error.message);
            //this.toastrService.error(response.error.message);
          }
          this.invalidLink = true;
          this.loading = false;
        });
  }

  passwordError() {
    return this.resetForm.controls.password.hasError('required') ? 'Password is required' :
      this.resetForm.controls.password.hasError('minlength') ? 'Password is required of minimum length of 8 characters' :
        this.resetForm.controls.password.hasError('maxlength') ? 'Password cannot exceed 100 characters' :
          this.resetForm.controls.password.hasError('pattern') ? 'Password must contain at least an upper case, a lower case and a special character.' :
            '';
  }

  confirmPasswordError() {
    return this.resetForm.controls.confirmPassword.hasError('required') ? 'Confirm password does not match with password' :
      '';
  }
}

