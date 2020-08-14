import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  perPage: number = 6;

  API: string = "https://assign5-blog-posts.herokuapp.com";

  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]>{

    if((tag == null || tag == undefined) && (category == null || category == undefined))
      return this.http.get<BlogPost[]>(`https://assign5-blog-posts.herokuapp.com/api/posts?page=${page}&perPage=${this.perPage}`);
    else if((tag != null || tag != undefined) && (category == null || category == undefined))
      return this.http.get<BlogPost[]>(`https://assign5-blog-posts.herokuapp.com/api/posts?page=${page}&perPage=${this.perPage}&tag=${tag}`);
    else if((tag == null || tag == undefined) && (category != null || category != null))
      return this.http.get<BlogPost[]>(`https://assign5-blog-posts.herokuapp.com/api/posts?page=${page}&perPage=${this.perPage}&category=${category}`);
    else if((tag != null || tag != undefined) && (category != null || category != undefined))
      return this.http.get<BlogPost[]>(`https://assign5-blog-posts.herokuapp.com/api/posts?page=${page}&perPage=${this.perPage}&tag=${tag}&category=${category}`);
  }

  getPostById(id):Observable<BlogPost>{

    return this.http.get<BlogPost>(`https://assign5-blog-posts.herokuapp.com/api/posts/${id}`);

  }

  getCategories():Observable<any>{
    return this.http.get<any>(`https://assign5-blog-posts.herokuapp.com/api/categories`);
  }

  getTags():Observable<string[]>{

    return this.http.get<string[]>(`${this.API}/api/tags`);
  }

  getAllPosts():Observable<BlogPost[]>{

    return this.http.get<BlogPost[]>(`${this.API}/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);

  }

  newPost(data: BlogPost):Observable<any>{

    return this.http.post<any>(`${this.API}/api/posts`, data);
  
  }

  updatePostById(id:string, data:BlogPost):Observable<any>{

    return this.http.put<any>(`${this.API}/api/posts/${id}`, data);
  }

  deletePostById(id:string):Observable<any>{

    return this.http.delete<any>(`${this.API}/api/posts/${id}`);
    
  }

}
