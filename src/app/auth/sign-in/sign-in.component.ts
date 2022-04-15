import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, AuthService, StorageService } from 'src/app/_core/services/common/';
import { Platform, LoadingController, MenuController } from '@ionic/angular';
import { SharedDataService } from 'src/app/_core/services/common/shared-data.service';
import { ToastService } from 'src/app/_core/services/common/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  // Form
  public loginForm: FormGroup;
  public processingReq = false;
  public loader: any;
  loading: boolean;
  // Subscription
  private loginSub: any;

  constructor(public authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
              public loadingController: LoadingController, public toastService: ToastService,
              private sharedDataService: SharedDataService, private platform: Platform, public menuCtrl: MenuController) { }


              ionViewWillEnter() {
                this.menuCtrl.enable(false);
               }
  ngOnInit() {
    // const user = AuthService.getLoggedUser();
    // if (user && user[`data`]) {
    //   this.router.navigate(['/home']);
    //   return;
    // }
    //const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    // Form validations
    
    this.createForm();
    console.log("Role 774")
  }




  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = new FormGroup({
      email: new FormControl(savedUserEmail,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(emailReg)]),
      password: new FormControl('', Validators.required),
      
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const email = this.loginForm.get('email').value.toString();
    const password = this.loginForm.get('password').value;

    this.authService
      .login(email, password)
      .subscribe(
        (res) => {
          this.loading = false;
          this.loginForm.reset();

          // If not activated by admin give a message.
          // if (!res.data.userInfo.isActive) {
          //     this.notificationService.openSnackBar('Please contact our support team.', 'Account Inactive!');
          //     return;
          // }

          if (!res.data.userInfo.isVerified) {
            this.toastService.presentToast('Please contact admin for account verification!');
            // this.router.navigate(['/verify-pin', res.data.userInfo.email], { queryParams: { sc: true } });
            return;
          }

          if (!res.data.userInfo.isVerified) {
            this.toastService.presentToast('Your account is not active!');
            // this.router.navigate(['/verify-pin', res.data.userInfo.email], { queryParams: { sc: true } });
            return;
          }


          if (res.data.userInfo.RoleId == 3) {
      
            AuthService.setLoggedUser(res.data);
            this.toastService.presentToast('Login Successful!');
            this.router.navigate(['/dashboard']);
            return;
          }
          else{
            this.toastService.presentToast('Login unSuccessful!');
            console.log("try again")
          }

          // if (res.data.userInfo.RoleId == 2) {
          //   this.router.navigate(['/farm']);
          //   return;
          // }
          // if (res.data.userInfo.RoleId == 3) {
          //   this.router.navigate(['/farm']);
          //   return;
          // }

          
        },
        (error) => {
          // this.notificationService.openSnackBar('Invalid email or password!');
          this.loading = false;
        }
      );
  }

  // convenience getter for easy access to form fields
  

  emailError() {
    return !this.loginForm.controls.email.dirty && !this.loginForm.controls.email.touched ? '' : this.loginForm.controls.email.hasError('required') ? 'Valid Email is required i.e user@wms.com' :
      this.loginForm.controls.email.hasError('maxlength') ? 'Valid Email is required i.e user@wms.com' :
        this.loginForm.controls.email.hasError('minlength') ? 'Valid Email is required i.e user@wms.com' :
          this.loginForm.controls.email.hasError('pattern') ? 'Valid Email is required i.e user@wms.com' :
            '';
  }

  passwordError() {
    return !this.loginForm.controls.password.dirty && !this.loginForm.controls.password.touched ? '' : this.loginForm.controls.password.hasError('required') ? 'Password is required' :
      this.loginForm.controls.password.hasError('minlength') ? 'Password is required of minimum length of 8 characters' :
        this.loginForm.controls.password.hasError('maxlength') ? 'First Name cannot exceed 100 characters' :
          '';
  }

 

 
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}