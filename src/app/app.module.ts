import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from '.';
import { CreateTopicComponent } from './topic/create-topic/create-topic.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { GetBlogsComponent } from './blog/get-blogs/get-blogs.component';
import { CreateCommentComponent } from './comment/create-comment/create-comment.component';
import { GetCommentsComponent } from './comment/get-comments/get-comments.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    CreateTopicComponent,
    CreateBlogComponent,
    GetBlogsComponent,
    CreateCommentComponent,
    GetCommentsComponent,
    WelcomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
