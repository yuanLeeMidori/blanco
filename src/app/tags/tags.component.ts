import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {

  tags: Array<string> ;
  // =[
  //   "#funny",
  //   "#dramatic",
  //   "#rental",
  //   "#seeagain",
  //   "#spooky",
  //   "#worththecost",
  //   "#lovedIt",
  //   "#scary",
  //   "#silly",
  //   "#good4kidz"
  //  ];
   
  private sub;

  constructor(private data: PostService) { }

  ngOnInit(): void {

    this.sub = this.data.getTags().subscribe(data => this.tags = data);

  }

  ngOnDestroy(){

    this.sub.unsubscribe();
    
  }

}
