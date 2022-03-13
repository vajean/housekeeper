import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import Task from "../models/tasks";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private dbPath = '/tasks';
  tasksRef: AngularFirestoreCollection<Task> = null;

  constructor(private db: AngularFirestore) {
    this.tasksRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Task> {
    return this.tasksRef;
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


}
