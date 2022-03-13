import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import Room from '../models/rooms'

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private dbPath = '/rooms';
  roomsRef: AngularFirestoreCollection<Room> = null;

  constructor(private db: AngularFirestore) {
    this.roomsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Room> {
    return this.roomsRef;
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
