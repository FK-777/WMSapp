import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
//import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';
import { StorageService } from 'src/app/core/services/common/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  verificationEmailBtn = false;
  loading: boolean;
  constructor(private router: Router, public formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public toastController: ToastController) {
  }


  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = StorageService.getItem("ci_email_remember") || "";
    this.loginForm = this.formBuilder.group({
      email: [email, [Validators.minLength(5), Validators.maxLength(100), Validators.required, Validators.pattern(emailReg)]],
      password: ['', [Validators.minLength(2), Validators.maxLength(100), Validators.required]],
      rememberMe: [false]
    })
  }
  
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // login(){
  //   this.router.navigate(['/dashboard']);
  // }

   login() {
    console.log("login called")
    //this.router.navigate(['/dashboard']);
     if (this.loginForm.invalid) {
       this.loginForm.markAllAsTouched();
       return;
     }
     this.loading = true;
     this.verificationEmailBtn = false;

     const email = this.loginForm.get('email').value.toString();
     const password = this.loginForm.get('password').value;

     if (this.loginForm.get('rememberMe').value) {
       StorageService.setItem("ci_email_remember", email);
     } else {
       StorageService.removeItem("ci_email_remember");
     }

     this.authenticationService
       .login(email, password)
       .then(
         (response) => {
           this.loading = false;
           this.loginForm.reset();
           AuthService.setLoggedUser(response);
           console.log('Login Success!');
           //this.toastrService.success('Login Successful!');
           console.log(response);
          
           //this.router.navigate(['/dashboard']);

           if (response.role == "employee") {
             console.log("aya hu bhai");
             this.router.navigate(['/dashboard']);
             this.presentToast("Login Successful!");
           } else
           {
             this.presentToast("Role Not Exists");
             //this.router.navigate(['/login']);
           }
         },
         (response) => {
           if (response.error && response.error.message) {
           this.presentToast(response.error.message);
             console.log(response.error.message);
             //this.toastrService.error(response.error.message);
           }
           if (response.error && response.error.error) {
             if (response.error.error == "please-verify") {
               this.verificationEmailBtn = true;
             }
           }
           this.loading = false;
         }
       );
   }

   resendVerificationLink() {
     if (this.loginForm.controls.email.invalid || this.loading) {
       this.loginForm.controls.email.markAsDirty();
       return;
     }

     this.verificationEmailBtn = false;
     this.loading = true;
     this.authenticationService
       .resendVerification(this.loginForm.get('email').value.toString())
       .then(
         (response) => {
           this.loading = false;
           this.presentToast("Verification email sent");
           console.log('Verification email sent', 'Success');
           //this.toastrService.success('Verification email sent', 'Success');
         },
         (response) => {
          if (response.error && response.error.message) {
             console.log(response.error.message);
             //this.toastrService.error(response.error.message);
           }
           this.loading = false;
         }
       );
   }

   resetPassword() {
     this.router.navigate(['/auth/password-forgot']);
   }

  emailError() {
    return this.loginForm.controls.email.hasError('required') ? 'Valid email is required' :
      this.loginForm.controls.email.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
        this.loginForm.controls.email.hasError('minlength') ? 'Email is required of minimum length of 5 characters' :
          this.loginForm.controls.email.hasError('pattern') ? 'Valid email is required' :
            '';
  }

  passwordError() {
    return this.loginForm.controls.password.hasError('required') ? 'Password is required' :
      this.loginForm.controls.password.hasError('minlength') ? 'Password is required of minimum length of 8 characters' :
        this.loginForm.controls.password.hasError('maxlength') ? 'Password cannot exceed 100 characters' :
          '';
  }
}
