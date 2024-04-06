import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Album } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private _apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  get apiUrl(): string {
    return this._apiUrl;
  }
  
  getAlbums(start: number, limit: number, searchTerm?: string, sortField?: string, sortDirection?: 'asc' | 'desc'): Observable<{ data: Album[] }> {
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

    return this.http.get<Album[]>(`${this.apiUrl}/albums`, { params }).pipe(
      map((response) => ({
        data: response
      }))
    );
  }

  getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${id}`);
  }
}