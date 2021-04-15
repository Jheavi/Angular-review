import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @ViewChild('invisibleText') spanText: ElementRef | undefined;
  minWidth: number = 100
  width: number = this.minWidth

  post?: Post | undefined

  modalVisible = false
  isTitleEditable = false
  isBodyEditable = false

  postForm = new FormGroup({
    postTitle: new FormControl(''),
    postBody: new FormControl(''),
  })

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location
    ) { }


  getPost(): void {
    const postId = this.route.snapshot.paramMap.get('id')
    if (postId) {
      this.postService.getPost(+postId)
      .subscribe(post => {
        this.post = post
        this.postForm.setValue({ postBody: post.body, postTitle: post.title })
      })
    }
  }

  ngOnInit(): void {
    this.getPost()
  }

  openModal(): void {
    this.modalVisible = true
  }

  closeModal(): void {
    this.modalVisible = false
  }

  confirmDeletePost(): void {
    this.postService.deletePost(this.post!.id).subscribe()
    this.location.back()
  }

  resize(): void {
    setTimeout(() => {
      this.width = Math.max(this.minWidth, this.spanText?.nativeElement.offsetWidth + 300)
    }, 0);
  }

  toggleEditTitle(): void {
    this.isTitleEditable = !this.isTitleEditable
    this.resize()
  }

  toggleEditBody(): void {
    this.isBodyEditable = !this.isBodyEditable
  }

  saveChanges(): void {
    const postToUpdate = {
      ...this.post!,
      body: this.postForm.value.postBody,
      title: this.postForm.value.postTitle
    }
    this.postService.updatePost(postToUpdate).subscribe()
    this.isTitleEditable = false
    this.isBodyEditable = false
  }
}
