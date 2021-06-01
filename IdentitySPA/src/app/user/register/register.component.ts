import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { userForReg } from 'src/app/core/models/userForReg';
import { CustomNgSnotifyService } from 'src/app/core/services/snotify.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, public service: UserService, private snotify: CustomNgSnotifyService) { }

  user: userForReg = {
    userName: '',
    email: '',
    fullName: '',
    password: ''
  };
  model: FormGroup = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Password: ['', [Validators.minLength(4), Validators.required]],
    ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
  }, {
    validator: this.comparePassword('Password', 'ConfirmPassword')
  });

  ngOnInit() { }

  register() {
    this.user.userName = this.model.controls.UserName.value;
    this.user.email = this.model.controls.Email.value;
    this.user.fullName = this.model.controls.FullName.value;
    this.user.password = this.model.controls.Password.value;
    this.service.register(this.user).subscribe(res => {
      if (res.succeeded) {
        this.snotify.success('User Register Successfully!', 'Success!');
      } else {
        this.snotify.error('Something went wrong here, double check again', 'Error!');
      }
    })
  }

  comparePassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
