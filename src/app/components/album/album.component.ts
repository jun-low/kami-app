import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album!: Album;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(): void {
    const id: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.albumService.getAlbumById(id).subscribe(album => this.album = album);
  }
}