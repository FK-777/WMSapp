import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/common/auth.service';
import { leaveService } from 'src/app/core/services/leave.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss'],
})
export class LeaveDetailsComponent implements OnInit {
id : any;
leaves = [];
myLeaves = [];
startDate;
endDate;
  constructor(private router: Router, private route: ActivatedRoute, private leaveService: leaveService,
    private datepipe : DatePipe) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.user;
      }
    });
  }
  ngOnInit() {
    console.log(this.id);
    this.fetchLeaves();

  }

  fetchLeaves(){
    const condition = {};
    this.leaveService.getLeaves(condition).subscribe((response) =>{
    this.leaves = response;
    for(let i=0, j=0; i<this.leaves.length ; i++){
    if(this.leaves[i]['_id'] == this.id){
    this.myLeaves[j] = this.leaves[i];
    j++;
    console.log(this.myLeaves);
    }
  }
  this.startDate = this.myLeaves[0]['startDate'];
  this.startDate = this.datepipe.transform((this.myLeaves[0]['startDate']), 'dd/MM/yyyy');
  this.endDate = this.myLeaves[0]['endDate'];
  this.endDate = this.datepipe.transform((this.myLeaves[0]['endDate']), 'dd/MM/yyyy');
  console.log(this.startDate, this.endDate);
    })
  }


}
