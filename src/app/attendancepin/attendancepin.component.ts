import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendancepin',
  templateUrl: './attendancepin.component.html',
  styleUrls: ['./attendancepin.component.scss'],
})
export class AttendancepinComponent implements OnInit {

  constructor(private route: Router) {}
  checkin() {
    this.route.navigate(['/check-in']);
  }
  ngOnInit() {}

}
