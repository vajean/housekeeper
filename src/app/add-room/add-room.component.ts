import { Component, OnInit } from '@angular/core';
import Task from "../models/tasks";
import {TasksService} from "../core/tasks.service";
import {RoomsService} from "../core/rooms.service";
import {map} from "rxjs/operators";
import Room from "../models/rooms";

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  room: Room = new Room();
  tasks: any;
  submitted = false;

  constructor(
    private taskService: TasksService,
    private roomService: RoomsService
  ) {
  }

  ngOnInit(): void {

  }

  saveRoom(): void {
    this.roomService.create(this.room).then(() => {
      console.log('Room added succesfully!');
      this.submitted = true;
    });
  }

  newRoom(): void {
    this.submitted = false;
    this.room = new Room();
  }

  hideForm(): void {
    this.roomService.room_form_visible = 0;
  }

}
