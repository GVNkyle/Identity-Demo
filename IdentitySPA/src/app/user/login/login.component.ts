import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userForLogin } from 'src/app/core/models/userForLogin';
import { CustomNgSnotifyService } from 'src/app/core/services/snotify.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router, private snotify: CustomNgSnotifyService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  login(form: NgForm) {
    let user: userForLogin = {
      userName: form.value.UserName,
      Password: form.value.Password
    };
    this.service.login(user).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl('/home');
    }, err => {
      if (err.status == 400)
        this.snotify.error('Incorrect username or password.', 'Authentication failed.');
      else
        console.log(err);
    });

  }
}
