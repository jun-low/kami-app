import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Photo } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private _apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return this._apiUrl;
  }

  getPhotos(start: number, limit: number, searchTerm?: string, sortField?: string, sortDirection?: 'asc' | 'desc'): Observable<{ data: Photo[] }> {
    let params = new HttpParams();
    params = params.set('start', start.toString());
    params = params.set('limit', limit.toString());

    if (searchTerm) {
      params = params.set('search', `${searchTerm}`);
    }

    if (sortField) {
      params = params.set('sort', sortField);
    }

    if (sortDirection) {
      params = params.set('order', sortDirection);
    }

    return this.http.get<Photo[]>(`${this.apiUrl}/photos`, { params }).pipe(
      map((response) => ({
        data: response
      }))
    );
  }

  getPhotoById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${this.apiUrl}/photos/${id}`);
  }
}