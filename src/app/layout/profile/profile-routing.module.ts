import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileHomeComponent } from './components/profile-home/profile-home.component';
import { StudentViewComponent } from './components/student-view/student-view.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [{
    path: '', redirectTo: 'home',
  }, {
    path: 'createUser/:userType', component: ProfileFormComponent
  }, {
    path: 'viewUser/:userId', component: ProfileHomeComponent
  }, {
    path: 'home', component: ProfileHomeComponent
  }, {
    path: 'studentDetails/:studentId', component: StudentViewComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
