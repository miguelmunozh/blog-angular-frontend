import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from './blog-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  // get all of the topics
  getAllBlogs(): Observable<Array<BlogModel>> {
    return this.http.get<Array<BlogModel>>('http://localhost:8080/Topics');
  }
}
