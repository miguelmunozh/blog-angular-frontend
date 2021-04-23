import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAllBlogsByTopicId(topicId: number):Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/posts/by-Topic/'+topicId);
  }

  createBloByTopicId(postModel: PostModel):Observable<PostModel>{
    return this.http.post<PostModel>('http://localhost:8080/posts/createPost',postModel);
  }

  getBlogModelByBlogId(blogId: number):Observable<PostModel>{    
    return this.http.get<any>('http://localhost:8080/posts/get-post/'+ blogId);
  }
}
