import { Component, OnInit } from '@angular/core';
import { TasksService } from "../core/tasks.service";
import Task from "../models/tasks";
import {map} from "rxjs/operators";
import {RoomsService} from "../core/rooms.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks:any;
  rooms:any;
  currentTask = null;
  currentIndex = -1;
  title = '';


  constructor(private taskService: TasksService,
              private roomService: RoomsService) { }

  ngOnInit(): void {
    this.retrieveTasks();
  }

  refreshList(): void {
    this.currentTask = null;
    this.currentIndex = -1;
    this.retrieveTasks();
  }

  retrieveTasks() {
    this.taskService.getAll().snapshotChanges().pipe(
      map(changes =>
      changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
      )
    ).subscribe(data => {
      this.tasks = data;
    });
  }

  setActiveTask(task, index): void{
    this.currentTask = task;
    this.currentIndex = index;
  }

  retrieveRooms(): void {
    this.roomService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.rooms = data;
    });
  }

  updateTask(): void {
    this.taskService.update(this.currentTask.id,this.currentTask).then(() => {
      console.log('Task updated succesfully!');
    });
  }

}
