import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { userForReg } from '../models/userForReg';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(user: userForReg) {
    return this.http.post<any>(`${this.url}ApplicationUser/Register`, user);
  }
}
