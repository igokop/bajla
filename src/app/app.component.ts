import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthentService } from './auth/authen.service';
import { DataStorageService } from './services/data-storage-service';
import { RoutesService } from './services/routes.service';
import { StravaService } from './services/strava.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bajla';
  constructor(private stravaService: StravaService ,private routesService: RoutesService, private dataStorageService: DataStorageService, private AuthentService: AuthentService){}
  
  ngOnInit(){
    this.routesService.getForecastData();
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData){
      const userDate = new Date(userData._tokenExpirationDate);
      if(new Date().getTime() > userDate.getTime()){
      localStorage.clear();
      }
    }
    this.AuthentService.autoLogin();
  }
  
}
