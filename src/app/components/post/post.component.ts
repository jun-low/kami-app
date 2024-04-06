import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post!: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const id: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.postService.getPostById(id).subscribe(post => this.post = post);
  }
}