import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import Task from "../models/tasks";
import {query, orderBy, limit} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private dbPath = '/tasks';
  orderWord='description';
  filterWord='all house';
  tasksRef: AngularFirestoreCollection<Task> = null;
  sortedTasks: AngularFirestoreCollection<Task> = null;
  task_form_visible: number;

  constructor(private db: AngularFirestore) {
    this.tasksRef = db.collection(this.dbPath);
    this.task_form_visible = 0;
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


}
