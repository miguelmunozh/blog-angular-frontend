import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { BlogService } from 'src/app/blog/blog.service';
import { PostModel } from 'src/app/blog/post-model';
import { CommentModel } from '../comment-model';
import {CommentService} from '../comment.service';

@Component({
  selector: 'app-get-comments',
  templateUrl: './get-comments.component.html',
  styleUrls: ['./get-comments.component.css']
})
export class GetCommentsComponent implements OnInit {

  blogId : number;
  blogName : string;
  topicName : string;
  topicId : number;
  blogModel : PostModel;
  commentsList : Array<CommentModel> = [];

  constructor(
    private commentService : CommentService, 
    private route : ActivatedRoute, 
    private blogService : BlogService) {
      
    // get two parammeters from the url
    this.route.params.subscribe(data=>{
      this.blogId = +data['id'];
      this.blogName = data['title'];
      this.topicName = data['topicTitle'];
      this.topicId = data['topicId'];
    })
  
    this.blogService.getBlogModelByBlogId(this.blogId).subscribe(data => {
      this.blogModel = data;
    }, (error: any) => {
      throwError(error);
    });
    
    // get the list of comments for the specified post
    this.commentService.getAllCommentsByPostId(this.blogId).subscribe(data=>{
      this.commentsList = data;
      });
   }
  ngOnInit(): void {
  }
}