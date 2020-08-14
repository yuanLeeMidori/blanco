import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  categories: Array<any>;
  // = [
  //   {cat: "Crime", num: 2},
  //   {cat: "Comedy", num: 1},
  //   {cat: "Musical", num: 1},
  //   {cat: "Adventure", num: 2},
  //   {cat: "Drama", num: 2},
  //   {cat: "Action", num: 2},
  //   {cat: "Documentary", num: 1},
  //   {cat: "Thriller", num: 1}
  // ];

  private sub;
  constructor(private data: PostService) { }

  ngOnInit(): void {

    this.sub = this.data.getCategories().subscribe(data => this.categories = data);
    // this.categories = this.data.getCategories();

  }

  ngOnDestroy(){

    this.sub.unsubscribe();
  }

}
