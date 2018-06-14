import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})
export class ProfileHomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addProfile(): void {
    this._router.navigate(['profile/createUser/student']);
  }
}
