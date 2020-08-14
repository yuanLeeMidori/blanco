import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost'
import { PostService } from '../post.service'

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit, OnDestroy {

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
