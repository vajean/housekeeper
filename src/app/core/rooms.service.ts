import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import Room from '../models/rooms'

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private dbPath = '/rooms';
  orderWord='id';
  roomsRef: AngularFirestoreCollection<Room> = null;
  room_form_visible: number;

  constructor(private db: AngularFirestore) {
    this.room_form_visible = 0;
    this.roomsRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Room> {
    return this.db.collection(this.dbPath,
      ref => ref.orderBy(this.orderWord));
  }

  create(room: Room): any {
    return this.roomsRef.add({...room })
  }

  update(id:string, data:any): Promise<void> {
    return this.roomsRef.doc(id).update(data);
  }

  delete(id:string): Promise<void> {
    return this.roomsRef.doc(id).delete();
  }


}
