import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts: Post[] = []

  constructor(private postService: PostService) { }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts)
  }

  ngOnInit(): void {
    this.getPosts()
  }

}
