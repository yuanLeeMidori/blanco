import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private data: PostService) { }

  posts: Array<BlogPost>;

  private sub;

  ngOnInit(): void {
    this.sub = this.data.getPosts(1, null, null).subscribe(data => this.posts = data.sort((a, b) => b.views - a.views).slice(0, 3));
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
