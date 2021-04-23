import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogModel } from 'src/app/shared/blog-model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  topicForm !: FormGroup;
  topicModel: BlogModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router,
    private topicService: TopicService) {
    this.topicForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      
    });
    this.topicModel = {
      title:'',
      description:'',
      id:0,
      userId:0,
      userName:'',
      createdDate:'',
    }
   }

  ngOnInit(): void {
  }

  discard(){
    this.router.navigateByUrl("/home");
  }
  createTopic(){
    this.topicModel.title = this.topicForm.get('title')?.value;
    this.topicModel.description = this.topicForm.get('description')?.value;
    
    this.topicService.createTopic(this.topicModel).subscribe(data=>{
      if(data){
        this.router.navigateByUrl('/home');
      }
    });
  }
}
