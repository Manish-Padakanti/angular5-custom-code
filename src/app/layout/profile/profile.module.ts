import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  HttpModule,
  Http,
  Response,
  Headers,
  RequestOptions 
}  from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
 import { ChartsModule as Ng2Charts } from 'ng2-charts';
 import { CalendarModule } from 'angular-calendar';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileHomeComponent } from './components/profile-home/profile-home.component';
import { StudentViewComponent } from './components/student-view/student-view.component';


@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    Ng2Charts,
    CalendarModule.forRoot()
  ],
  declarations: [ProfileComponent, ProfileFormComponent, ProfileHomeComponent, StudentViewComponent]
})
export class ProfileModule { }
