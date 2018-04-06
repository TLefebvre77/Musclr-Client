import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-scheduler-container',
  templateUrl: './scheduler-container.component.html',
  styleUrls: ['./scheduler-container.component.scss']
})
export class SchedulerContainerComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
    (document.getElementsByClassName('navbar').item(0) as HTMLElement).style.backgroundColor = 'black';
  }

  ngOnDestroy() {
    (document.getElementsByClassName('navbar').item(0) as HTMLElement).style.backgroundColor = 'transparent';
  }

}
