import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumComponent } from './components/album/album.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoComponent } from './components/photo/photo.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostComponent },
  { path: 'albums', component: AlbumListComponent },
  { path: 'albums/:id', component: AlbumComponent },
  { path: 'photos', component: PhotoListComponent },
  { path: 'photos/:id', component: PhotoComponent },
  { path: 'users/:id', component: UserComponent },
];
