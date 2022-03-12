import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authservice: AuthService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }
  logout() {
    this.authservice.logout();
  }

}
