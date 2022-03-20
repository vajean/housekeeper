import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  home_tab_visibility = 'active';
  rooms_tab_visibility = '';
  tasks_tab_visibility = '';

  constructor(
    private authservice: AuthService,
    public afAuth: AngularFireAuth,
  ) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authservice.logout();
  }

  nav_home() {
    this.home_tab_visibility = 'active';
    this.rooms_tab_visibility = '';
    this.tasks_tab_visibility = '';
  }

  nav_rooms() {
    this.home_tab_visibility = '';
    this.rooms_tab_visibility = 'active';
    this.tasks_tab_visibility = '';
  }

  nav_tasks() {
    this.home_tab_visibility = '';
    this.rooms_tab_visibility = '';
    this.tasks_tab_visibility = 'active';
  }

}
