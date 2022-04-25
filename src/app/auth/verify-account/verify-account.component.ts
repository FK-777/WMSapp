import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { AuthenticationService } from 'src/app/core/services/common/authentication.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  invalidLink: boolean = false;
  loading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder,
     private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if (!this.route.snapshot.params.verification) {
      this.invalidLink = true;
      return;
    }
    this.verifyAccount();
  }

  verifyAccount() {
    this.loading = true;
    this.authenticationService
      .verifyAccount(this.route.snapshot.params.verification)
      .then(
        (response) => {
          AuthService.setLoggedUser(response);
          console.log("Account verified");
          //this.toastrService.success('Account verified', "Success!");
          this.loading = false;

          if (response.role == "admin") {
            this.router.navigate(['/dashboard']);
          } else if (response.role == "startup") {
            this.router.navigate(['/my-offer']);
          } else if (response.role == "investor") {
            this.router.navigate(['/dashboard']);
          }
        }).catch((response) => {
          console.log("======>", response);
          if (response.error && response.error.message) {
            console.log(response.error.message);
            //this.toastrService.error(response.error.message);
          }
          this.invalidLink = true;
          this.loading = false;
        });
  }
}
