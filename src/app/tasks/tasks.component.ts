import {Component, OnInit} from '@angular/core';
import { TasksService } from "../core/tasks.service";
import Task from "../models/tasks";
import {map} from "rxjs/operators";
import {RoomsService} from "../core/rooms.service";
import {Router} from "@angular/router";
import {getAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  task: Task = new Task();
  tasks:any;
  rooms:any;
  currentTask = null;
  currentIndex = -1;
  title = '';
  date:any;

  constructor(public taskService: TasksService,
              private roomService: RoomsService,
              private router: Router
  )   { }

  ngOnInit(): void {
    this.retrieveTasks();
    this.retrieveRooms();
    this.updateStatus()
  }


  refreshList(): void {
    this.currentTask = null;
    this.currentIndex = -1;
    this.retrieveTasks();
  }

  filters(order: string, filter?: string) {
    this.taskService.orderWord=order;
    this.refreshList();
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

  updateStatus(): void {
    this.taskService.getOnce()
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

  saveTask(): void {
    this.taskService.create(this.task).then(() => {
    });
  }

  showForm() : void {
    this.taskService.task_form_visible = 1;
  }

}
