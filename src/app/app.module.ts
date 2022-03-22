import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule} from "angular-bootstrap-md";
import { AngularFireModule} from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireAuthGuard } from "@angular/fire/compat/auth-guard";
import { FormsModule } from "@angular/forms";

import { environment } from "../environments/environment";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanComponent } from './plan/plan.component';
import {TasksComponent} from './tasks/tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FilterByPipe } from './filter-by.pipe';
import { AddRoomComponent } from './add-room/add-room.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    PlanComponent,
    TasksComponent,
    AddTaskComponent,
    RoomsComponent,
    FilterByPipe,
    AddRoomComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    MDBBootstrapModule.forRoot(),
    AngularFireAuthModule
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
