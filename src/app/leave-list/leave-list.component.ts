import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss'],
})
export class LeaveListComponent implements OnInit {

  constructor(private route: Router) { }

  details(){
    this.route.navigate(['/leave-details']);
  }
  ngOnInit() {}

}
