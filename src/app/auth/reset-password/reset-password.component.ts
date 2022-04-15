import { Component, OnInit, HostListener, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/_core/services/common';
import { LoadingController } from '@ionic/angular';
import { SharedDataService } from 'src/app/_core/services/common/shared-data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  @ViewChild('digit1', { static: true }) digit0: ElementRef;
  @ViewChild('digit2', { static: true }) digit1: ElementRef;
  @ViewChild('digit3', { static: true }) digit2: ElementRef;
  @ViewChild('digit4', { static: true }) digit3: ElementRef;

  private phone: string;
  public verificationForm: FormGroup;
  public isProcessing = false;
  public hasError = false;
  public timeLeft = 0;
  public loader: any;

  // Subscription
  private verifySub: any;
  private resendOtpSub: any;

  constructor(public authService: AuthenticationService, private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder, public toastController: ToastController, private sharedDataService: SharedDataService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    // Form validations
    this.verificationForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(numericNumberReg)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      otp: ['', [Validators.required, Validators.min(1000), Validators.max(9999)]]
    });

    this.route.params.subscribe((params) => {
      this.phone = String(params.phone);
      if (!this.phone || this.phone.length < 11 || this.phone.length > 11) {
        this.router.navigate(['/login']);
      }
      this.verificationForm.controls.phone.setValue(this.phone);
    });

    this.route.queryParams.subscribe((query) => {
      if (query.sc && query.sc == 'true') {
        console.log('this.phone', this.phone);
        this.resendOtp();
      }
    });
  }

  keyChanged(index, key) {
    if (key == 'Backspace') {
      switch (index) {
        case 1:
          this.digit1.nativeElement.value = '';
          this.digit0.nativeElement.focus();
          break;

        case 2:
          this.digit2.nativeElement.value = '';
          this.digit1.nativeElement.focus();
          break;

        case 3:
          this.digit3.nativeElement.value = '';
          this.digit2.nativeElement.focus();
          break;

        default:
          break;
      }
    } else {
      if (!isNaN(key)) {
        switch (index) {
          case 0:
            this.digit1.nativeElement.value = '';
            this.digit2.nativeElement.value = '';
            this.digit3.nativeElement.value = '';
            this.digit1.nativeElement.focus();
            break;
          case 1:
            this.digit2.nativeElement.value = '';
            this.digit3.nativeElement.value = '';
            this.digit2.nativeElement.focus();
            break;

          case 2:
            this.digit3.nativeElement.value = '';
            this.digit3.nativeElement.focus();
            break;
          default:
            break;
        }
      }

    }
    // console.log(index, key);
    // console.log(this.digit1);
  }

  resendOtp() {
    if (this.timeLeft > 0) {
      return;
    }

    this.presentLoading();
    this.resendOtpSub = this.authService.resendOtp(this.phone).subscribe(res => {
      this.loader.dismiss();
      this.presentToast('Reset pin resent!');
      this.timeLeft = 120;
      const that = this;
      const resendPinInternal = setInterval(() => {
        if (that.timeLeft == 0) {
          clearInterval(resendPinInternal);
        }
        that.timeLeft = that.timeLeft - 1;
      }, 1000);

    }, error => {
      this.loader.dismiss();
      if (error && error.error && error.error.message) {
        if (error.error.message.find((x) => x.error == 1583)) {
          this.presentToast('Phone number is not valid! Please retry.');
          this.router.navigate(['forgot-password']);
          return;
        }
      }
      this.presentToast('Unable to resend verification pin! Please retry.');
      this.router.navigate(['forgot-password']);
    });
  }

  verifyOtp() {
    this.isProcessing = true;

    this.f.otp.setValue(
      // tslint:disable-next-line: max-line-length
      `${this.digit0.nativeElement.value}${this.digit1.nativeElement.value}${this.digit2.nativeElement.value}${this.digit3.nativeElement.value}`
    );

    // stop here if form is invalid
    if (this.verificationForm.invalid) {
      this.hasError = true;
      this.verificationForm.markAllAsTouched();
      this.isProcessing = false;
      return;
    }
    this.hasError = false;

    this.presentLoading();
    this.verifySub = this.authService.resetPassword(this.phone, this.verificationForm.controls.password.value,
      this.verificationForm.controls.otp.value)
      .subscribe((response) => {
        this.loader.dismiss();
        this.isProcessing = false;
        if (response && response.data) {
          this.presentToast('Password changed successfully!');
          this.router.navigate(['sign-in']);
        }
      }, (error) => {
        this.loader.dismiss();
        this.isProcessing = false;
        if (error && error.error && error.error.message) {
          console.log('======', error.error.message);
          if (error.error.message.find((x) => x.error == 1570)) {
            this.presentToast('Pin is invalid or expired!');
          }
        }
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.verificationForm.controls;
  }

  otpError() {
    return this.verificationForm.controls.otp.hasError('required') ? '4 digits pin is required' :
      this.verificationForm.controls.otp.hasError('minlength') ? '4 digits pin is required' :
        this.verificationForm.controls.otp.hasError('maxlength') ? '4 digits pin is required' :
          '';
  }

  passwordError() {
    return this.verificationForm.controls.password.hasError('required') ? 'Password is required' :
      this.verificationForm.controls.password.hasError('minlength') ? 'Password is required of minimum length of 8 characters' :
        this.verificationForm.controls.password.hasError('maxlength') ? 'Password cannot exceed 16 characters' :
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
    if (this.verifySub) {
      this.verifySub.unsubscribe();
    }
    if (this.resendOtpSub) {
      this.resendOtpSub.unsubscribe();
    }
  }
}
