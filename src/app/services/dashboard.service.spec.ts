import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { Post, Photo } from '../models/model';
import { provideRouter } from '@angular/router';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [DashboardService, provideRouter([])]
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from the API', () => {
    const mockPosts: Post[] = [
      { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
      { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch photos from the API', () => {
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

    service.getPhotos().subscribe(photos => {
      expect(photos).toEqual(mockPhotos);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/photos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });
});

