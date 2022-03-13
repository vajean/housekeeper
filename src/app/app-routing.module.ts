import {from} from 'rxjs';
import {map} from 'rxjs/operators';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/compat/auth-guard';
import {PlanComponent} from "./plan/plan.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {TasksComponent} from "./tasks/tasks.component";

const redirectToLogin = () => redirectUnauthorizedTo(['']);

const redirectToPlan = () => redirectLoggedInTo(['plan'])

// @ts-ignore
const onlyAllowSelf = next => map(
  // tslint:disable-next-line: triple-equals
  user => (!!user && next.params.id == (user as any).uid) || ['']
);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToPlan
    }
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: onlyAllowSelf
    }
  },
  {
    path: 'plan',
    component: PlanComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToLogin
    }
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToLogin
    }
  },
  {
    path: 'tasks/add',
    component: AddTaskComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToLogin
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
