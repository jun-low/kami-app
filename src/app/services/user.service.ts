import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return this._apiUrl;
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}