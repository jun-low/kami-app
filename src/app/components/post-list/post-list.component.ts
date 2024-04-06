import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/model';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchTerm: string = '';
  sortField: keyof Post = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;
  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || '';
      this.sortField = (params['sortField']) || '';
      this.sortDirection = params['sortDirection'] || 'asc';
      this.currentPage = +params['page'] || 1;
      this.loadPosts(this.currentPage);
    });
  }

  loadPosts(page: number): void {
    this.isLoading = true;
    this.postService
      .getPosts((page), this.pageSize, this.searchTerm, this.sortField, this.sortDirection)
      .subscribe({
        next:(response) => {
          this.posts = response.data;
          this.applyFiltersAndSorting();
          this.updateQueryParams();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
  }

  onItemChange(): void {
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadPosts(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateQueryParams();
    this.loadPosts(this.currentPage);
  }

  private applyFiltersAndSorting(): void {
    this.filteredPosts = this.posts.filter(post => post.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.filteredPosts = this.filteredPosts.sort((a: Post, b: Post) => {
      if (a[this.sortField] < b[this.sortField]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[this.sortField] > b[this.sortField]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  private updateQueryParams(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm || null,
        sortField: this.sortField || null,
        sortDirection: this.sortDirection || null,
        page: this.currentPage || null
      },
      queryParamsHandling: 'merge'
    });
  }
}