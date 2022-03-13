import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  loading = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(form: NgForm){

    this.loading = true;
    this.error = null;
    const { email, password } = form.value;
    let resp;

    try {
      resp = await this.afAuth.signInWithEmailAndPassword(email, password)

      const uid = resp.user.uid;
      this.router.navigate([`/plan`]);

    } catch (error) {

      console.log(error.message);
      this.error = error.message;
    }

    this.loading = false;

  }

}
