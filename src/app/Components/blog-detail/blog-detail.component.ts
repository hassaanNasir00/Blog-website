import { Component, OnInit } from '@angular/core';
import { BlogDetail } from 'src/app/Models/blog-detail';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  public blogDetail?: BlogDetail;
  public blogId: number = 0;
  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.service.blogId$.subscribe((id) => {
      this.getBlogDetail(id);
    });
  }

  getBlogDetail(id: number): void {
    this.service.getBlogDetails(id).subscribe(
      (detail) => {
        console.log(detail, 'checking details');
        this.blogDetail = detail;
      },
      (error) => {
        console.error('error fetching blog details', error);
      }
    );
  }
}
