import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost'
import { PostService } from '../post.service'


@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit, OnDestroy {

  posts: Array<BlogPost>;

  constructor(private data: PostService) { }

  private sub;


  ngOnInit(): void {
    this.sub = this.data.getPosts(1, null, null).subscribe(data => this.posts = data.slice(0,3));
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

