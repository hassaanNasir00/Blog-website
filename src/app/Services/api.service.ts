import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogData } from '../Models/blog-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://api.slingacademy.com/v1/sample-data/blog-posts';

  constructor(private http: HttpClient) {}

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

  public getBlogDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
