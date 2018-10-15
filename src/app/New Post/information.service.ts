import { Injectable } from '@angular/core';
import { Subject, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/core/src/render3/util';
import { Post } from './post.model';
import { Capability } from 'protractor';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class InformationService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            id: post._id,
            name: post.name,
            month: post.month,
          };
        });
      }))
      .subscribe(transformedData => {
        this.posts = transformedData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() { 
    return this.postsUpdated.asObservable();
  }

  addPost(
    name: string,
    month: string
    ) {
    const post: Post = {name: name, month: month };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
