import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router'
import { BlogPost } from '../BlogPost';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }

  blogPost: BlogPost = new BlogPost();
  tags: string;

  formSubmit(form: NgForm): void{


    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toString();
    this.blogPost.postedBy = "Ms. Blanco";
    this.blogPost.views = 0;

    this.data.newPost(this.blogPost).subscribe();
    this.router.navigate(['/admin']);

  }

  ngOnInit(): void {
  }

}
