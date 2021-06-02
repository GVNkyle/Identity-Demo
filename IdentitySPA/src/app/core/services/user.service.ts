import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { userForReg } from '../models/userForReg';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { userForLogin } from '../models/userForLogin';
import { userProfile } from '../models/userProfile';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
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
}
