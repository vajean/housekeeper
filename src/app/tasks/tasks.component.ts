import { Component, OnInit } from '@angular/core';
import { TasksService } from "../core/tasks.service";
import Task from "../models/tasks";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
