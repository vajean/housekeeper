import { Component, OnInit } from '@angular/core';
import Task from "../models/tasks";
import {TasksService} from "../core/tasks.service";
import {RoomsService} from "../core/rooms.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import Room from "../models/rooms";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {task: Task = new Task();
  room: Room = new Room();
  tasks:any;
  rooms:any;
  currentRoom = null;
  currentId = null;
  currentIndex = -1;
  title = '';

  constructor(public taskService: TasksService,
              public roomService: RoomsService,
              private router: Router
  )   { }

  ngOnInit(): void {
    this.retrieveTasks();
    this.retrieveRooms();

  }

  refreshList(): void {
    this.currentRoom = null;
    this.currentIndex = -1;
    this.retrieveRooms();
  }

  filters(order: string) {
    this.roomService.orderWord=order;
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

  setActiveRoom(room, index): void{
    this.currentRoom = room;
    this.currentId = room.id
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

  updateRoom(): void {
    this.roomService.update(this.currentId,this.currentRoom).then(() => {
      console.log('Room updated successfully!');
    });
  }

  saveRoom(): void {
    this.roomService.create(this.room).then(() => {
    });
  }

  showForm() : void {
    this.roomService.room_form_visible = 1;
  }

}
