import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
@Component({
  selector: 'app-attendancethumb',
  templateUrl: './attendancethumb.component.html',
  styleUrls: ['./attendancethumb.component.scss'],
})
export class AttendancethumbComponent implements OnInit {

  constructor(private route: Router, private faio: FingerprintAIO) {}
  pin() {
    this.route.navigate(['/attendancepin']);
  }
  ngOnInit() {}


  public showFingeerprintAuthentication() {

    console.log("Button clicked")
    this.faio.isAvailable().then((result: any) => {
      console.log(result)
      console.log("Button clicked")
      this.faio.show({
        cancelButtonTitle: 'Cancel',
        description: "Please put your thumb on your device fingerprint scanner to proceed!",
        disableBackup: true,
        title: 'Biometric Attendance',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'Use Device Scanner'
      })
        .then((result: any) => {
          console.log(result)
          alert("Successfully Authenticated!")
          this.route.navigate(['/check-in']);
        })
        .catch((error: any) => {
          console.log(error)
          alert("Match not found!")
          this.route.navigate(['/attendancepin']);
        });
    })
      .catch((error: any) => {
        console.log(error)
      });
  }

}
