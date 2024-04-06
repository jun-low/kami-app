import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/model';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user!: User

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id: string = this.route.snapshot.paramMap.get('id') ?? '';
    this.userService.getUserById(id).subscribe({
      next:(user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }
}