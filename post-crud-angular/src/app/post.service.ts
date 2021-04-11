import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private serverUrl = 'http://localhost:2130/'

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
        catchError(this.handleError<Post[]>('getPosts', []))
      )
  }
}
