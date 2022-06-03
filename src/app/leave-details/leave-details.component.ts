import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/common/auth.service';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss'],
})
export class LeaveDetailsComponent implements OnInit {
id : string ;
  constructor( private router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id"); 

  }

}
