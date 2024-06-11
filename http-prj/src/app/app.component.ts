import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PostsService } from './posts.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error: any = null;
  subscription!: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.fetchPosts();
    this.subscription = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData).subscribe((responseData) => {
      console.log(responseData)
      this.fetchPosts();
    });
    // console.log(postData)
    // this.http.post('https://making-http-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData).subscribe((data) => {
    //   console.log(data)
    // })
    // Send Http request
    // this.http
    //   .post(
    //     'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.isFetching = false;
      this.loadedPosts = posts
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    })
  }

  onHandleError() {
    this.error = null;
  }
  title = 'http-prj';
}
