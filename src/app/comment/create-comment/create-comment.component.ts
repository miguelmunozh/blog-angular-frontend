import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentModel } from '../comment-model';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent implements OnInit {

  commentForm : FormGroup;
  commentModel : CommentModel;

  topicId : number;
  topicName : string;

  blogId : number;
  blogName : string;

  constructor(private commentService : CommentService, private route : ActivatedRoute, private router : Router) {
    // get the vars from the url
    this.route.params.subscribe(data=>{
      this.topicId = +data['topicId'];
      this.topicName = data['topicTitle'];
      this.blogId = +data['id'];
      this.blogName = data['title'];
    });

    this.commentForm = new FormGroup({
      text : new FormControl('', Validators.required)
    });

    this.commentModel = {
      id : 0,
      createdDate : '',
      text : '',
      postId : 0,
      userId : 0,
      userName : ''
    }



   }

   createComment(){
    this.commentModel.text = this.commentForm.get('text')?.value;
    this.commentModel.postId = this.blogId;

    return this.commentService.createCommentForPostId(this.commentModel).subscribe(data=>{
      if(data){
        this.router.navigateByUrl(`/Get-Comments/${this.topicName}/${this.topicId}/${this.blogName}/${this.blogId}`);
      }
    });
   }

   discard(){
    this.router.navigateByUrl(`/Get-Comments/${this.topicName}/${this.topicId}/${this.blogName}/${this.blogId}`);
  }

  ngOnInit(): void {
  }

}
