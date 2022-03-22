import {Component, OnInit} from '@angular/core';
import Task from "../models/tasks";
import {TasksService} from "../core/tasks.service";
import {RoomsService} from "../core/rooms.service";
import {map} from 'rxjs/operators';
import {getAuth} from "@angular/fire/auth";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  task: Task = new Task();
  rooms: any;
  submitted = false;

  constructor(
    private taskService: TasksService,
    private roomService: RoomsService,
  ) {
  }

  ngOnInit(): void {
    this.retrieveRooms();
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

  saveTask(): void {
    this.task.status = true;
    this.task.completed = Date.now()
    this.taskService.create(this.task).then(() => {
      console.log('Task added succesfully!');
      this.submitted = true;
    });
  }

  newTask(): void {
    this.submitted = false;
    this.task = new Task();
  }

  hideForm(): void {
    this.taskService.task_form_visible = 0;
  }

}
