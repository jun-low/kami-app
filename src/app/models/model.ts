export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}