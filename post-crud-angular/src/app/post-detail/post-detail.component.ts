import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post?: Post

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
    ) { }

  getPost(): void {
    const postId = this.route.snapshot.paramMap.get('id')
    if (postId) {
      this.postService.getPost(+postId)
      .subscribe(post => this.post = post)
    }
  }

  ngOnInit(): void {
    this.getPost()
  }

}
