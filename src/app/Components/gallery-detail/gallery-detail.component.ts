import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/Models/product';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css'],
})
export class GalleryDetailComponent implements OnInit {
  galleryDetail?: Product;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.galleryDetailIdSubject$.subscribe((id) => {
      console.log(id);

      this.getGalleryDetail(id);
    });
  }
  getGalleryDetail(id: number) {
    this.apiService.getGalleryPostsDetail(id).subscribe((res) => {
      console.log(res, 'detail-res');
      this.galleryDetail = res;
      console.log(this.galleryDetail);
    });
  }
}
