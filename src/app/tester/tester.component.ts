import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss'],
})
export class TesterComponent implements OnInit {

  colors: string[];
  constructor() { }

  ngOnInit(
    
  ) {
    this.colors = ['white', 'beige', 'yellow'];
  }

}
