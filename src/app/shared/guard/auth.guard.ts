import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import {Http, Response,Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import { UIResponse } from '../models/UIResponse';
import { Profile } from '../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _authService: AuthService) {}

    canActivate() {
		if (this._authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
