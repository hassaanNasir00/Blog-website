import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blogId: any;
  blogDetail: any = {};
  constructor(private service: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.blogId = +param['id'];
      console.log(this.blogId);
      this.getBlogDetail(this.blogId);
    });
  }

  getBlogDetail(id: number): void {
    this.service.getBlogDetails(id).subscribe((detail) => {
      console.log(detail);
      this.blogDetail = detail.blog;
    });
  }
}
