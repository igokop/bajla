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
    return this.http.post("https://payments-for-bajla.herokuapp.com/feed/posts", body, headers);
  }
}