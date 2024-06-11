import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, map, throwError, tap } from "rxjs";
import { Post } from "./post.model";


@Injectable({ providedIn: 'root' })
export class PostsService {

    apiUrl = 'https://making-http-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';

    error = new Subject<string>();

    constructor(private http: HttpClient) { }

    createAndStorePost(postData: Post): Observable<Post> {
        return this.http.post<Post>(this.apiUrl, postData,
            { observe: 'response' }
        ).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                // Handle errors here (log, display message, etc.)
                console.error('An error occurred:', error);
                // Rethrow the error to be handled by the caller
                return throwError('Something bad happened; please try again later.');
            })
        );
    }

    fetchPosts(): Observable<Post[]> {
        // let searchParams = new HttpParams();
        // searchParams = searchParams.append('print', 'pretty');
        // searchParams = searchParams.append('custom', 'key');

        return this.http.get<Post[]>(
            this.apiUrl,
            {
                headers: new HttpHeaders({
                    'Custom-Header': 'Hello'
                }),
                // params: searchParams,
                responseType: 'json'
            }
        ).pipe(
            map((responseData) => {
                // console.log(responseData)
                const postsArray: Post[] = [];

                for (const key in responseData) {
                    // console.log(key)
                    if (responseData.hasOwnProperty(key)) {
                        postsArray.push({ ...responseData[key], id: key });
                    }
                }
                // console.log(postsArray)
                return postsArray;
            }), catchError((errorResponse) => {
                return throwError(errorResponse)
            })
        )
    }

    deletePosts(): Observable<void> {
        return this.http.delete<void>(this.apiUrl, {
            observe: 'events',
            responseType: 'json'
        }).pipe(
            tap((event: any) => {
                console.log(event);
                if (event.type === HttpEventType.Sent) {

                } if (event.type === HttpEventType.Response) {
                    console.log(event)

                }
            })
        );
    }
}