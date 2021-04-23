import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from './comment-model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  getAllCommentsByPostId(postId:number) : Observable<Array<CommentModel>>{
    return this.http.get<Array<CommentModel>>('http://localhost:8080/comments/by-post/' + postId);
  }

  createCommentForPostId(commentModel:CommentModel): Observable<CommentModel>{
    return this.http.post<CommentModel>('http://localhost:8080/comments/createComment', commentModel);
  }
}
