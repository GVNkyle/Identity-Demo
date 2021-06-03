import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { userForReg } from '../models/userForReg';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { userForLogin } from '../models/userForLogin';
import { userProfile } from '../models/userProfile';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  jwt = new JwtHelperService();
  decodeToken: any;
  constructor(private http: HttpClient) { }

  register(user: userForReg) {
    return this.http.post<any>(`${this.url}ApplicationUser/Register`, user);
  }

  login(user: userForLogin) {
    return this.http.post<any>(`${this.url}ApplicationUser/Login`, user);
  }

  getUserProfile() {
    let token = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    return this.http.get<userProfile>(`${this.url}UserProfile`, { headers: token });
  }

  roleMatch(allowedRoles: string[]): boolean {
    let flag = false;
    const token = localStorage.getItem('token');
    this.decodeToken = this.jwt.decodeToken(token as string);
    allowedRoles.forEach(e => {
      if (this.decodeToken.role == e) {
        flag = true;
        return false;
      } else {
        return true;
      }
    });
    return flag;
  }
}
