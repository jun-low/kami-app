import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/model';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule, RouterLink],
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = [];
  filteredAlbums: Album[] = [];
  searchTerm: string = '';
  sortField: keyof Album = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;
  isLoading: boolean = false;

  constructor(
    private albumService: AlbumService,
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
    this.albumService
      .getAlbums((page), this.pageSize, this.searchTerm, this.sortField, this.sortDirection)
      .subscribe({
        next:(response) => {
          this.albums = response.data;
          this.applyFiltersAndSorting();
          this.updateQueryParams();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching albums:', error);
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
    this.filteredAlbums = this.albums.filter(album => album.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.filteredAlbums = this.filteredAlbums.sort((a: Album, b: Album) => {
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