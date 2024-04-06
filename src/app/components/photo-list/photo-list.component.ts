import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/model';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule, RouterLink],
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  searchTerm: string = '';
  sortField: keyof Photo = 'title';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 12;
  isLoading: boolean = false;

  constructor(
    private PhotoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] || '';
      this.sortField = (params['sortField']) || '';
      this.sortDirection = params['sortDirection'] || 'asc';
      this.currentPage = +params['page'] || 1;
      this.loadPhotos(this.currentPage);
    });
  }

  loadPhotos(page: number): void {
    this.isLoading = true;
    this.PhotoService
      .getPhotos((page), this.pageSize, this.searchTerm, this.sortField, this.sortDirection)
      .subscribe({
        next:(response) => {
          this.photos = response.data;
          this.applyFiltersAndSorting();
          this.updateQueryParams();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching photos:', error);
        }
      });
  }

  onItemChange(): void {
    this.currentPage = 1;
    this.updateQueryParams();
    this.loadPhotos(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateQueryParams();
    this.loadPhotos(this.currentPage);
  }

  private applyFiltersAndSorting(): void {
    this.filteredPhotos = this.photos.filter(photo => photo.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.filteredPhotos = this.filteredPhotos.sort((a: Photo, b: Photo) => {
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