import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/model';
import { provideRouter } from '@angular/router';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
      providers: [UserService, provideRouter([])]
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a user by ID', () => {
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      website: 'johndoe.com',
    };

    service.getUserById('1').subscribe((user: User) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/users/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser);
  });

  it('should handle a 404 error when fetching a user', () => {
    service.getUserById('999').subscribe({
      next:() => fail('expected an error'),
      error:(error) => {
        expect(error.status).toEqual(404);
      }
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/users/999`);
    expect(req.request.method).toEqual('GET');
    req.flush('', { status: 404, statusText: 'Not Found' });
  });
});