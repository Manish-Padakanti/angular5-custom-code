import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../shared/services/auth.service';
import { AuthGuard } from '../shared/guard/auth.guard';
import {
    NgForm
} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(private _router: Router, private _authService: AuthService) {}

    ngOnInit() {}

    onLoggedin(loginForm: NgForm) {
		if(loginForm.valid) {
            const userName  = loginForm.value.emailId;
            const password = loginForm.value.password;
			this._authService.doLogin(userName, password).subscribe(response => {
			  if(response.status) {
				this._authService.setUserDataObj(response.result);
				this._router.navigate(['dashboard']);
			  } 
			}, error => {
				console.log(error);
			});
		}
    }
}
