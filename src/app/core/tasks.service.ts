import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import Task from "../models/tasks";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private dbPath = '/tasks';
  orderWord='title';
  filterWord='all';
  tasksRef: AngularFirestoreCollection<Task> = null;
  task_form_visible: number;

  constructor(private db: AngularFirestore) {
    this.task_form_visible = 0;
    this.tasksRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Task> {
    return this.db.collection(this.dbPath,
        ref => ref.orderBy(this.orderWord));
  }

  create(task: Task): any {
    return this.tasksRef.add({...task })
  }

  update(id:string, data:any): Promise<void> {
    return this.tasksRef.doc(id).update(data);
  }

  delete(id:string): Promise<void> {
    return this.tasksRef.doc(id).delete();
  }

  getOnce(): void {
    this.db.collection("tasks")
    .get()
    .subscribe(snap => {
    snap.forEach(doc => {
    console.log(doc.data()['room_id'])
  })
})
}




}
