import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { PostModel } from '../post-model';

@Component({
  selector: 'app-get-blogs',
  templateUrl: './get-blogs.component.html',
  styleUrls: ['./get-blogs.component.css']
})
export class GetBlogsComponent implements OnInit {

  topicId : number;
  topicName:string;
  blogs$: Array<PostModel> = [];

  constructor(private route: ActivatedRoute, private blogService : BlogService) {
    this.route.params.subscribe(params => {
      this.topicId = +params['id'];
      this.topicName = params['title'];
    });

    // get all of the posts of the desired topic by topic id
    this.blogService.getAllBlogsByTopicId(this.topicId).subscribe(blog => {
      this.blogs$ = blog;
    })


   }

  ngOnInit(): void {
  }

}
