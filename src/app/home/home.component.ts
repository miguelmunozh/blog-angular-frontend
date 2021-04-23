import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../shared/blog-model';
import { BlogService } from '../shared/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$: Array<BlogModel> = [];
  
  constructor(private blogService: BlogService) {
    this.blogService.getAllBlogs().subscribe(blog => {
      this.blogs$ = blog;
    })
   }

  ngOnInit(): void {
  }

}
