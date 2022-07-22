import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { attendanceService } from 'src/app/core/services/attendance.service';
import { leaveService } from 'src/app/core/services/leave.service';
import { AuthService } from '../core/services/common/auth.service';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss'],
})
export class LeaveListComponent implements OnInit {
leaves = [];
userId = AuthService.getLoggedUser().id ;
myLeaves = [];
markerleave = 0 ;
leaveID;
  constructor(private route: Router ,private attendanceService: attendanceService,
    private nav: NavController, private leaveService: leaveService,) { }

  details(id){
    console.log(id);
    let navigationExtras: NavigationExtras = {
      state: {
        user: id
      }
    };
    this.route.navigate(['leave-details'], navigationExtras);
  }

  ngOnInit() {
    this.fetchLeaves();
  }

  fetchLeaves(){
    const condition = {};
    this.leaveService.getLeaves(condition).subscribe((response) =>{
    this.leaves = response;
    for(let one=0, two=0; one < this.leaves.length ; one++){
    if(this.leaves[one]['EmployeeId'] == this.userId){
    this.myLeaves[two] = this.leaves[one];
    //this.markerleave = this.attendanceLeaves.length;
    two++;
    console.log(this.myLeaves);
    }    
  }
    })
  }

}
