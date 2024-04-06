import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoService } from './photo.service';
import { Photo } from '../models/model';
import { provideRouter } from '@angular/router';

describe('PhotoService', () => {
  let service: PhotoService;
  let httpTestingController: HttpTestingController;
  const mockPhotos: Photo[] = [
    {
      id: 1,
      albumId: 1,
      title: 'Photo 1',
      url: 'https://example.com/photo1.jpg',
      thumbnailUrl: 'https://example.com/photo1_thumb.jpg'
    },
    {
      id: 2,
      albumId: 1,
      title: 'Photo 2',
      url: 'https://example.com/photo2.jpg',
      thumbnailUrl: 'https://example.com/photo2_thumb.jpg'
    }
  ];
  const mockPhoto: Photo = {
    id: 1,
    albumId: 1,
    title: 'Photo 1',
    url: 'https://example.com/photo1.jpg',
    thumbnailUrl: 'https://example.com/photo1_thumb.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [PhotoService, provideRouter([])]
    });

    service = TestBed.inject(PhotoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of photos', () => {
    service.getPhotos(0, 10).subscribe((response) => {
      expect(response.data).toEqual(mockPhotos);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/photos?start=0&limit=10`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPhotos);
  });

  it('should fetch a photo by ID', () => {
    service.getPhotoById('1').subscribe((photo) => {
      expect(photo).toEqual(mockPhoto);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/photos/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPhoto);
  });

  it('should fetch photos with search and sorting', () => {
    service.getPhotos(0, 10, 'photo', 'title', 'asc').subscribe((response) => {
      expect(response.data).toEqual(mockPhotos);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/photos?start=0&limit=10&search=photo&sort=title&order=asc`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPhotos);
  });
});