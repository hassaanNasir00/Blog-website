import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogData } from '../Models/blog-data';
import { BlogDetail } from '../Models/blog-detail';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl: string =
    'https://api.slingacademy.com/v1/sample-data/blog-posts';
  public blogDetailIdSubject$ = new BehaviorSubject<number>(0);
  public blogId$ = this.blogDetailIdSubject$.asObservable();

  constructor(private http: HttpClient) {
    const storedBlogId = localStorage.getItem('blogId');
    if (storedBlogId) {
      this.blogDetailIdSubject$.next(+storedBlogId);
    }
  }

  public getBlogPosts(
    page: number,
    pageSize: number,
    limit: number
  ): Observable<BlogData> {
    const offset = (page - 1) * pageSize;
    return this.http.get<BlogData>(
      `${this.baseUrl}?offset=${offset}&limit=${pageSize}&totalBlogs=${limit}`
    );
  }

  public getBlogDetails(id: number): Observable<BlogDetail> {
    return this.http.get<BlogDetail>(`${this.baseUrl}/${id}`);
  }

  public getBlogId(id: number): void {
    this.blogDetailIdSubject$.next(id);
    localStorage.setItem('blogId', id.toString());
  }
}
