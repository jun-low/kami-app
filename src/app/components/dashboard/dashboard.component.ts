import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Post, Album, Photo, User } from '../../models/model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  albums: Album[] = [];
  photos: Photo[] = [];
  users: User[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.dashboardService.getPosts().subscribe(posts => this.posts = posts);
    this.dashboardService.getAlbums().subscribe(albums => this.albums = albums);
    this.dashboardService.getPhotos().subscribe(photos => this.photos = photos);
    this.dashboardService.getUsers().subscribe(users => this.users = users);
  }
}