import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  HttpModule,
  Http,
  Response,
  Headers,
  RequestOptions 
}  from '@angular/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
