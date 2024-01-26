import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogData } from '../Models/blog-data';
import { BlogDetail } from '../Models/blog-detail';
import { GalleryPost } from '../Models/gallery-post';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl: string =
    'https://api.slingacademy.com/v1/sample-data/blog-posts';
  public blogDetailIdSubject$ = new BehaviorSubject<number>(0);
  public galleryDetailIdSubject$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    const storedBlogId = localStorage.getItem('blogId');
    const galleryPostId = localStorage.getItem('galleryId');

    if (storedBlogId) {
      this.blogDetailIdSubject$.next(+storedBlogId);
    }
    if (galleryPostId) {
      this.galleryDetailIdSubject$.next(+galleryPostId);
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

  public getGalleryId(id: number): void {
    this.galleryDetailIdSubject$.next(id);
    localStorage.setItem('galleryId', id.toString());
  }

  public getGalleryPosts(): Observable<GalleryPost[]> {
    return this.http.get<GalleryPost[]>('https://fakestoreapi.com/products');
  }

  public getGalleryPostsDetail(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }
}
