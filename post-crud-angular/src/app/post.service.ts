import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private serverUrl = 'http://localhost:2130'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  posts$ = new Subject<Post[]>()

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T)
    }
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.serverUrl)
      .pipe(
        tap((posts) => this.posts$.next(posts)),
        catchError(this.handleError<Post[]>('getPosts', []))
      )
  }

  getPost(postId: number): Observable<Post> {
    const url = `${this.serverUrl}/${postId}`

    return this.http.get<Post>(url)
      .pipe(
        catchError(this.handleError<Post>('getPost'))
      )
    }

    deletePost(postId: number): Observable<string> {
    const url = `${this.serverUrl}/${postId}`

    return this.http.delete<string>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>('deletePost'))
      )
  }
}
