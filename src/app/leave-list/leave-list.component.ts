import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
attendanceLeaves = [];
markerleave = 0 ;
  constructor(private route: Router ,private attendanceService: attendanceService, private leaveService: leaveService,) { }

  details(){
    this.route.navigate(['/leave-details']);
  }

  checkin(){
    const condition = {};
    this.leaveService.getLeaves(condition).subscribe((response) =>{
    this.leaves =response;
    for(let one=0 , two=0; one < this.leaves.length ; one++){
    if(this.leaves[one]['EmployeeId'] == this.userId){
    this.attendanceLeaves[two] = this.leaves[one];
    this.markerleave = this.attendanceLeaves.length;
    two++;
    }}
    })}
  ngOnInit() {
    this.checkin();
  }

}
