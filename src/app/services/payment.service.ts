import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class paymentService {

  constructor(private http: HttpClient) { }

  sendToken(body){
    let headers = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }
    // return this.http.post("https://mailforphotography.herokuapp.com/feed/posts", body, headers);
    return this.http.post("http://localhost:8080/feed/posts", body, headers);
  }
}
