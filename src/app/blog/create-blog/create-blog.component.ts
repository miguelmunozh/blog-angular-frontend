import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { PostModel } from '../post-model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  topicId : number;
  topicName : string;
  blogModel : PostModel;
  blogForm !: FormGroup;

  constructor(private route: ActivatedRoute, private router:Router, private blogService: BlogService) {
    // get the topic id
    this.route.params.subscribe(params => {
      this.topicId = +params['id']; // (+) converts string 'id' to a number
      this.topicName = params['title'];

      console.log(this.topicId);
      // am also sending receiving the number so now I can create a blog for certain topic
      // do the call to service to create a new
   });

    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    // initialize variables of blog to be created and sent to the server as an json obj
    this.blogModel = {
      postId : 0,
      postName : '',

      description : '',
      createdDate : '',
      voteCount :0 ,

      topicSectionId : 0,
      topicName : '',

      userId : 0,
      userName : ''

    }
   }

   createBlogByTopicId(){
    this.blogModel.postName = this.blogForm.get('title')?.value;
    this.blogModel.description = this.blogForm.get('description')?.value;
    this.blogModel.topicSectionId = this.topicId;

    this.blogService.createBloByTopicId(this.blogModel).subscribe(data=>{
      this.router.navigateByUrl(`/get-blogs/${this.topicName}/${this.topicId}`);
    }, error=>{
      console.log('error occurred');
    })
   }
   discard(){
    this.router.navigateByUrl(`/get-blogs/${this.topicName}/${this.topicId}`);
  }
  ngOnInit() {
  }

}
