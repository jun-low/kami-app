import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AlbumService } from './album.service';
import { Album } from '../models/model';


describe('AlbumService', () => {
  let service: AlbumService;
  let httpTestingController: HttpTestingController;
  const mockAlbums: Album[] = [
    {id: 1, userId: 1, title: 'Album 1'},
    {id: 2, userId: 2, title: 'Album 2'},
  ];
  const mockAlbum: Album = {id: 1, userId: 1, title: 'Album 1'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [AlbumService, provideRouter([])]
    });

    service = TestBed.inject(AlbumService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of albums', () => {
    service.getAlbums(0, 10).subscribe((response) => {
      expect(response.data).toEqual(mockAlbums);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/albums?start=0&limit=10`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAlbums);
  });

  it('should fetch a album by ID', () => {
    service.getAlbumById('1').subscribe((album) => {
      expect(album).toEqual(mockAlbum);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/albums/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAlbum);
  });

  it('should fetch photos with search and sorting', () => {
    service.getAlbums(0, 10, 'album', 'title', 'asc').subscribe((response) => {
      expect(response.data).toEqual(mockAlbums);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/albums?start=0&limit=10&search=album&sort=title&order=asc`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAlbums);
  });
});
