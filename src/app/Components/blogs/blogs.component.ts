import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogData } from 'src/app/Models/blog-data';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  public blogList?: BlogData;
  public currentPage: number = 1;
  public pageSize: number = 10;
  public totalBlogs: number = 100;

  constructor(
    private blogService: ApiService,
    private route: Router,
    private authService: AuthService
  ) {
    this.blogService.blogDetailIdSubject$.subscribe((data) => {
      console.log(data, 'checkingufeiubh');
    });
  }

  public ngOnInit(): void {
    this.getBlogList(this.currentPage, this.pageSize);
  }

  public getBlogList(page: number, pageSize: number): void {
    this.blogService
      .getBlogPosts(page, pageSize, this.totalBlogs)
      .subscribe((data) => {
        this.blogList = data;
        this.totalBlogs = data.total_blogs;
      });
  }

  public showDetail(id: number): void {
    const isLoggedIn = this.authService.isLoggedIn.value;
    if (isLoggedIn) {
      this.blogService.getBlogId(id);
      this.route.navigate(['/blog-detail']);
    } else {
      this.route.navigate(['/login']);
    }
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.getBlogList(this.currentPage, this.pageSize);
  }
}
