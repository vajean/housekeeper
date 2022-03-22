import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  home_tab_visibility = '';
  rooms_tab_visibility = '';
  tasks_tab_visibility = '';

  constructor(
    private authservice: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if(this.router.url == '/tasks'){
      this.nav_tasks()
    }
    if(this.router.url == '/rooms'){
      this.nav_rooms()
    }
    if(this.router.url == '/home'){
      this.nav_home()
    }
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
