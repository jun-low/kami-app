import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, Album, Photo, User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return this._apiUrl;
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/photos`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}