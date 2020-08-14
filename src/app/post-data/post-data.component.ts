import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  post : BlogPost;

  commentName: string;
  commentText: string;

  querySub: any;

  secondSub: any;

  constructor(private data: PostService, private route: ActivatedRoute) { }

  submitComment(){

    let newComment = {

      "author": this.commentName,
      "comment": this.commentText,
      "date": new Date().toISOString(),

    };

    this.post.comments.push(newComment);
   
    this.data.updatePostById(this.post._id, this.post).subscribe(sub =>{
      if(sub != null){
        this.commentText = "",
        this.commentName = ""
      }
    }
            
    );

  }
  ngOnInit(): void {
    
    this.querySub = this.route.params.subscribe(params => {
      let id = this.route.snapshot.params['id'];
      //TODO: Get post by Id params['id'] and store the result in this.post
      this.secondSub = this.data.getPostById(id).subscribe(data => {
        this.post = data,
        this.post.views = this.post.views + 1,
        this.data.updatePostById(this.post._id, this.post).subscribe();
      });
      
      

     })

  }

  ngOnDestroy(){

    if(this.querySub)
      this.querySub.unsubscribe();

    if(this.secondSub)
      this.querySub.unsubscribe();
  }

}
