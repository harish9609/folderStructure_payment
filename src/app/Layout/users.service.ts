import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://localhost:7170/api/user/';   // ✅ apiUrl defined yahan

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // saveUser(formData: any) {
  //   return this.http.post(this.apiUrl+'SaveUser', formData);
  // }

  saveUser(formData: FormData) {
  return this.http.post(this.apiUrl+'SaveUser', formData);
}
}
