import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  public passwordForm: FormGroup;
  public isProcessing = false;
  public user: any;

  // function for matching of password and confirm password.
  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: 'no' };
    };
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              public toastController: ToastController,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = AuthService.getLoggedUser();
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newPasswordMatch: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
      UpdatePasswordComponent.matchValues('newPassword')]]
    });
  }

  updatePassword() {
    this.isProcessing = true;
    console.log("Clicked");
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
     this.authenticationService.changePassword(this.passwordForm.value.password, this.passwordForm.value.newPassword).subscribe((response) => {
       this.isProcessing = false;
       this.passwordForm.reset();
       this.router.navigate(['/screen/update-profile']);
       this.presentToast('Password updated successfully!');
     }, (error) => {
       this.presentToast('Password cannot be updated!');
       this.isProcessing = false;
     });
  }


  passwordError() {
    return this.passwordForm.controls.password.hasError('required') ? 'Password is required' :
      this.passwordForm.controls.password.hasError('minlength') ? 'Password is required of minimum 8 characters' :
        this.passwordForm.controls.password.hasError('maxlength') ? 'Password cannot exceed 16 characters' :
          '';
  }


  newPasswordError() {
    return this.passwordForm.controls.newPassword.hasError('required') ? 'Password is required' :
      this.passwordForm.controls.newPassword.hasError('minlength') ? 'Password is required of minimum 8 characters' :
        this.passwordForm.controls.newPassword.hasError('maxlength') ? 'Password cannot exceed 16 characters' :
          '';
  }

  newPasswordMatchError() {
    return this.passwordForm.controls.newPasswordMatch.hasError('required') ? 'Confirm password is required' :
      this.passwordForm.controls.newPasswordMatch.hasError('minlength') ? 'Confirm password is required of minimum 8 characters' :
        this.passwordForm.controls.newPasswordMatch.hasError('maxlength') ? 'Confirm password cannot exceed 16 characters' :
          this.passwordForm.controls.newPasswordMatch.hasError('isMatching') && this.passwordForm.controls.newPasswordMatch.touched ?
            'Confirm password does not match' :
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
}
