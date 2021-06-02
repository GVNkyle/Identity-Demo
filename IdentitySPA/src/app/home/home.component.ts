import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userProfile } from '../core/models/userProfile';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userProfile: userProfile = {
    userName: '',
    fullName: '',
    email: ''
  };
  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(res => {
      this.userProfile = res;
    }, err => {
      console.log(err);
    });
  }

  Logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
