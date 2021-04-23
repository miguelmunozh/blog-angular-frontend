import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from '../shared/blog-model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  createTopic(topicModel: BlogModel):Observable<BlogModel>{
    return this.http.post<BlogModel>('http://localhost:8080/Topics/createTopic', topicModel);
  }
}
