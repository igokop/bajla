import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { empty, Subject } from 'rxjs';
import { Distance } from '../models/distance.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StravaService {
  nameId: any[]=[];
  @Output() stravaProfile: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }
  distanceTable: Distance[] = [];
  getDataFromStrava(token){
    let seconds = new Date().getTime() / 1000;
    let secondsAfter = seconds - 31556926;
    seconds = Math.round(seconds*1)/1;
    let headers = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    }
    this.http.get('https://www.strava.com/api/v3/athlete', headers).subscribe(data =>{
      this.stravaProfile.emit(data);
    })

    for(let i=1; i<5;i++){
      this.http.get<any>('https://www.strava.com/api/v3/athlete/activities?before='+seconds+'&after='+secondsAfter+'&page='+ i +'&per_page=100', headers).subscribe(data =>{
        for(let j=0; j<100;j++)
        {
          if(data[j] && data[j].type === 'Ride'){
            let amount = data[j].distance/1000
            amount = Math.round(amount*1)/1;
            let date;
            let datePipe = new DatePipe('en-US');
            date = datePipe.transform(data[j].start_date, 'yyyy-MM-dd');
            const training = {date, amount};
            this.addDistance(training);
            const name = {name: data[j].name, id: data[j].id, date}
            this.nameId.push(name);

          }
        }
      })
    }

  }
  getNames(){
    this.nameId.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return this.nameId;
  }
  getDistances(){
    this.distanceTable.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return this.distanceTable;
  }

  addDistance(data){
    this.distanceTable.push(data);
  }

  getToken(code){
    const params = new HttpParams()
  .set('client_id', '64364')
  .set('client_secret', '83655a4adde5f7d30d9120e994f42a6064ffdf3a')
  .set('code', code)
  .set('grant_type', 'authorization_code');
    // let params = {
    //   params: new HttpParams({
    //     'client_id' '64364',
    //     'client_secret': '83655a4adde5f7d30d9120e994f42a6064ffdf3a',
    //     'code': code,
    //     'grant_type': 'authorization_code',
    //   })
    // }
    this.http.post<any>('https://www.strava.com/oauth/token', params).subscribe(data=>{
      this.getDataFromStrava(data.access_token);
    })
  }
}