import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryPost } from 'src/app/Models/gallery-post';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  galleryPost?: GalleryPost[] = [];
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.getGalleryPosts();
  }
  getGalleryPosts(): void {
    this.apiService.getGalleryPosts().subscribe((res: GalleryPost[]) => {
      console.log(res, 'Gallery response');
      this.galleryPost = res;
    });
  }

  galleryPostDetail(id: number): void {
    const isLoggedIn = this.authService.isLoggedIn.value;
    if (isLoggedIn) {
      this.apiService.getGalleryId(id);
      this.route.navigate(['/gallery-detail']);
    } else {
      this.route.navigate(['/login']);
    }
  }
}
