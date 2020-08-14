import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router'
import { BlogPost } from '../BlogPost';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  blogPost: BlogPost;
  tags: string;

  private sub;
  private secondSub;
  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }

  
  formSubmit(form: NgForm): void{

    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe();
    this.router.navigate(['/admin']);

  }
  deletePost(){

    this.data.deletePostById(this.blogPost._id).subscribe();
    this.router.navigate(['/admin']);
    
  }
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      let id = this.route.snapshot.params['id'];
      this.secondSub = this.data.getPostById(id).subscribe(post => {
        this.blogPost = post;
        this.tags = post.tags.toString()});
    });
   
  }

  ngOnDestroy(){

    if(this.sub)
      this.sub.unsubscribe();

    if(this.secondSub)
      this.secondSub.unsubscribe();
  }

}
