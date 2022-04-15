import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router) { }

  checkin(){
    this.route.navigate(['/attendancethumb']);
  }
  logout(){
    this.route.navigate(['/sign-in']);
  }
  settings() {
    this.route.navigate(['/settings']);
  }
  applyleave(){
    this.route.navigate(['/apply-leave']);
  }
  leavereport(){
    this.route.navigate(['/leave-list']);
  }
  ngOnInit() {}

}
