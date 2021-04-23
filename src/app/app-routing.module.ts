import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { GetBlogsComponent } from './blog/get-blogs/get-blogs.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { GetCommentsComponent } from './comment/get-comments/get-comments.component';
import { HomeComponent } from './home/home.component';
import { CreateTopicComponent } from './topic/create-topic/create-topic.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './welcome/welcome.component';


// here we declare all the routes inside our application
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LoginComponent },
  { path: 'user-profile/:username', component: UserComponent },
  { path: 'Create-Topic', component: CreateTopicComponent },
  { path: 'get-blogs/:title/:id', component: GetBlogsComponent },
  { path: 'Create-Blog/:title/:id', component: CreateBlogComponent },
  { path: 'Get-Comments/:topicTitle/:topicId/:title/:id', component: GetCommentsComponent },
  { path: 'Create-Comment/:topicTitle/:topicId/:title/:id', component: CreateCommentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
