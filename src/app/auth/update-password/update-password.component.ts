import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/common';
import { UserService } from 'src/app/_core/services/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  public form: FormGroup;
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

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router,
              public toastController: ToastController) { }

  ngOnInit() {
    this.user = AuthService.getLoggedUser();
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newPasswordMatch: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
      UpdatePasswordComponent.matchValues('newPassword')]]
    });
  }

  updatePassword() {
    this.isProcessing = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // this.userService.changePassword(this.form.value.password, this.form.value.newPassword).subscribe((response) => {
    //   this.isProcessing = false;
    //   this.form.reset();
    //   this.router.navigate(['/screen/update-profile']);
    //   this.presentToast('Password updated successfully!');
    // }, (error) => {
    //   this.presentToast('Password cannot be updated!');
    //   this.isProcessing = false;
    // });
  }


  passwordError() {
    return this.form.controls.password.hasError('required') ? 'Password is required' :
      this.form.controls.password.hasError('minlength') ? 'Password is required of minimum 8 characters' :
        this.form.controls.password.hasError('maxlength') ? 'Password cannot exceed 16 characters' :
          '';
  }


  newPasswordError() {
    return this.form.controls.newPassword.hasError('required') ? 'Password is required' :
      this.form.controls.newPassword.hasError('minlength') ? 'Password is required of minimum 8 characters' :
        this.form.controls.newPassword.hasError('maxlength') ? 'Password cannot exceed 16 characters' :
          '';
  }

  newPasswordMatchError() {
    return this.form.controls.newPasswordMatch.hasError('required') ? 'Confirm password is required' :
      this.form.controls.newPasswordMatch.hasError('minlength') ? 'Confirm password is required of minimum 8 characters' :
        this.form.controls.newPasswordMatch.hasError('maxlength') ? 'Confirm password cannot exceed 16 characters' :
          this.form.controls.newPasswordMatch.hasError('isMatching') && this.form.controls.newPasswordMatch.touched ?
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
