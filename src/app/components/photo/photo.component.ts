import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../models/model';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  photo!: Photo;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.getPhoto();
  }

  getPhoto(): void {
    const id: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.photoService.getPhotoById(id).subscribe(photo => this.photo = photo);
  }
}