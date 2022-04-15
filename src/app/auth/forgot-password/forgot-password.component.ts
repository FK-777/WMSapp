import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, AuthService, StorageService } from 'src/app/_core/services/common';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SharedDataService } from 'src/app/_core/services/common/shared-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  // Form
  public loginForm: FormGroup;
  public processingReq = false;
  public loader: any;

  // Subscription
  private loginSub: any;

  constructor(public authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
              public toastController: ToastController, private sharedDataService: SharedDataService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    const user = AuthService.getLoggedUser();
    if (user && user[`data`]) {
      this.router.navigate(['/home']);
      return;
    }
    const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    // Form validations
    this.loginForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(numericNumberReg)]]
    });
  }

  forgotPassword() {
    this.processingReq = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key).markAsDirty();
      });
      this.processingReq = false;
      return;
    }

    this.presentLoading();
    this.loginSub = this.authService.forgotPassword(this.loginForm.value.phone)
      .subscribe((response) => {
        this.loader.dismiss();
        this.processingReq = false;
        if (response.data) {
          this.router.navigate(['reset-password', this.loginForm.value.phone]);
        }
      }, error => {
        this.loader.dismiss();
        this.processingReq = false;
        this.presentToast('Invalid phone number!');
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  phoneError() {
    return this.loginForm.controls.phone.hasError('required') ? 'Valid phone number is required i.e 03xxxxxxxxx' :
      this.loginForm.controls.phone.hasError('maxlength') ? 'Valid phone number is required i.e 03xxxxxxxxx' :
        this.loginForm.controls.phone.hasError('minlength') ? 'Valid phone number is required i.e 03xxxxxxxxx' :
          this.loginForm.controls.phone.hasError('pattern') ? 'Valid phone number is required i.e 03xxxxxxxxx' :
            '';
  }

  async presentToast(message: string, header?: string) {
    const toast = await this.toastController.create({
      message,
      header,
      // position: 'top',
      duration: 2000
    });
    toast.present();
  }


  async presentLoading() {
    this.loader = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait..',
      translucent: true,
      backdropDismiss: true
    });
    await this.loader.present();
  }

  @HostListener('window:beforeunload')
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
