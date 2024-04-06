import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../models/model';
import { provideRouter } from '@angular/router';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;
  const mockPosts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'Post 1',
      body: 'This is the first post.'
    },
    {
      id: 2,
      userId: 2,
      title: 'Post 2',
      body: 'This is the second post.'
    }
  ];
  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: 'Post 1',
    body: 'This is the first post.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [PostService, provideRouter([])]
    });

    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a list of posts', () => {
    service.getPosts(0, 10).subscribe((response) => {
      expect(response.data).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/posts?start=0&limit=10`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPosts);
  });

  it('should fetch a post by ID', () => {
    service.getPostById('1').subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/posts/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPost);
  });

  it('should fetch posts with search and sorting', () => {
    service.getPosts(0, 10, 'post', 'title', 'asc').subscribe((response) => {
      expect(response.data).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/posts?start=0&limit=10&search=post&sort=title&order=asc`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockPosts);
  });
});