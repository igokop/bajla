import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Injectable, OnInit } from '@angular/core';
import { Route } from '../models/route.model';
import { RoutesService } from '../services/routes.service';
import { DataStorageService } from '../services/data-storage-service';

@Injectable()
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
  animations: [
    trigger('list', [
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateY(-100px)'
        }),
        animate(400)
    ])
  ]),]
})
export class RoutesComponent implements OnInit {
  i:number;
  ttomorrow;
  tttomorrow;
  forecastToday: any=[];
  todayTemperature: number;
  tomorrowTemperature: number;
  ttomorrowTemperature: number;
  tttomorrowTemperature: number;
  forecastTomorrow: any=[];
  forecastTTomorrow: any=[];
  forecastTTTomorrow: any=[];
  routes: Route[]=[];
  alertOpen = false;
  points = [];
  forecast: any=[];

  constructor(private routesService: RoutesService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.forecast = this.routesService.forecast;
    this.view();
    this.routesService.getWeatherData();
    this.routesService.forecastUpdate.subscribe(forecast => {
      this.forecast = forecast;
      this.view();
    })
    this.routesService.routesUpdate.subscribe(routes => {
      this.routes = routes;
      console.log(this.routes.length)
    });
  }

  view(){
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 3);
    this.tttomorrow = nextDay;
    this.ttomorrow = tomorrow;


    this.forecastToday = this.forecast.daily[0];
    if(this.forecastToday.temp.day -273 > -80){
      this.forecastToday.temp.day=this.forecastToday.temp.day-273;
      this.forecastToday.wind_speed=this.forecastToday.wind_speed*3.6;
    }
    this.forecastToday.temp.day = Math.round(this.forecastToday.temp.day *10)/10.0;
    this.todayTemperature = this.forecastToday.temp.day;
    this.forecastToday.wind_speed = Math.round(this.forecastToday.wind_speed *10)/10.0;
    if(!this.forecastToday.rain){
      this.forecastToday.rain = 0;
    }


    this.forecastTomorrow = this.forecast.daily[1];
    if(this.forecastTomorrow.temp.day -273 > -80){
      this.forecastTomorrow.temp.day=this.forecastTomorrow.temp.day-273;
      this.forecastTomorrow.wind_speed=this.forecastTomorrow.wind_speed*3.6;
    }
    this.forecastTomorrow.temp.day = Math.round(this.forecastTomorrow.temp.day *10)/10.0;
    this.tomorrowTemperature = this.forecastTomorrow.temp.day;
    this.forecastTomorrow.wind_speed = Math.round(this.forecastTomorrow.wind_speed *10)/10.0;
    if(!this.forecastTomorrow.rain){
      this.forecastTomorrow.rain = 0;
    }

    this.forecastTTomorrow = this.forecast.daily[2];
    if(this.forecastTTomorrow.temp.day -273 > -80){
      this.forecastTTomorrow.temp.day=this.forecastTTomorrow.temp.day-273;
      this.forecastTTomorrow.wind_speed=this.forecastTTomorrow.wind_speed*3.6;
    }
    this.forecastTTomorrow.temp.day = Math.round(this.forecastTTomorrow.temp.day *10)/10.0;
    this.ttomorrowTemperature = this.forecastTTomorrow.temp.day;
    this.forecastTTomorrow.wind_speed = Math.round(this.forecastTTomorrow.wind_speed *10)/10.0;
    if(!this.forecastTTomorrow.rain){
      this.forecastTTomorrow.rain = 0;
    }

    this.forecastTTTomorrow = this.forecast.daily[3];
    if(this.forecastTTTomorrow.temp.day -273 > -80){
      this.forecastTTTomorrow.temp.day=this.forecastTTTomorrow.temp.day-273;
      this.forecastTTTomorrow.wind_speed=this.forecastTTTomorrow.wind_speed*3.6;
    }
    this.forecastTTTomorrow.temp.day = Math.round(this.forecastTTTomorrow.temp.day *10)/10.0;
    this.tttomorrowTemperature = this.forecastTTTomorrow.temp.day;
    this.forecastTTTomorrow.wind_speed = Math.round(this.forecastTTTomorrow.wind_speed *10)/10.0;
    if(!this.forecastTTTomorrow.rain){
      this.forecastTTTomorrow.rain = 0;
    }
    if(this.forecastToday.wind_deg<22.5){
      this.forecastToday.wind_deg='S';
    }else if(this.forecastToday.wind_deg<67.5){
      this.forecastToday.wind_deg='SW';
    }else if(this.forecastToday.wind_deg<112.5){
      this.forecastToday.wind_deg='W';
    }else if(this.forecastToday.wind_deg<157.5){
      this.forecastToday.wind_deg='NW';
    }else if(this.forecastToday.wind_deg<202.5){
      this.forecastToday.wind_deg='N';
    }else if(this.forecastToday.wind_deg<247.5){
      this.forecastToday.wind_deg='NE';
    }else if(this.forecastToday.wind_deg<292.5){
      this.forecastToday.wind_deg='E';
    }else if(this.forecastToday.wind_deg<337.5){
      this.forecastToday.wind_deg='SE';
    }else if(this.forecastToday.wind_deg<360){
      this.forecastToday.wind_deg='S';}
    
    if(this.forecastTomorrow.wind_deg<22.5){
      this.forecastTomorrow.wind_deg='S';
    }else if(this.forecastTomorrow.wind_deg<67.5){
      this.forecastTomorrow.wind_deg='SW';
    }else if(this.forecastTomorrow.wind_deg<112.5){
      this.forecastTomorrow.wind_deg='W';
    }else if(this.forecastTomorrow.wind_deg<157.5){
      this.forecastTomorrow.wind_deg='NW';
    }else if(this.forecastTomorrow.wind_deg<202.5){
      this.forecastTomorrow.wind_deg='N';
    }else if(this.forecastTomorrow.wind_deg<247.5){
      this.forecastTomorrow.wind_deg='NE';
    }else if(this.forecastTomorrow.wind_deg<292.5){
      this.forecastTomorrow.wind_deg='E';
    }else if(this.forecastTomorrow.wind_deg<337.5){
      this.forecastTomorrow.wind_deg='SE';
    }else if(this.forecastTomorrow.wind_deg<360){
      this.forecastTomorrow.wind_deg='S';}

    if(this.forecastTTomorrow.wind_deg<22.5){
      this.forecastTTomorrow.wind_deg='S';
    }else if(this.forecastTTomorrow.wind_deg<67.5){
      this.forecastTTomorrow.wind_deg='SW';
    }else if(this.forecastTTomorrow.wind_deg<112.5){
      this.forecastTTomorrow.wind_deg='W';
    }else if(this.forecastTTomorrow.wind_deg<157.5){
      this.forecastTTomorrow.wind_deg='NW';
    }else if(this.forecastTTomorrow.wind_deg<202.5){
      this.forecastTTomorrow.wind_deg='N';
    }else if(this.forecastTTomorrow.wind_deg<247.5){
      this.forecastTTomorrow.wind_deg='NE';
    }else if(this.forecastTTomorrow.wind_deg<292.5){
      this.forecastTTomorrow.wind_deg='E';
    }else if(this.forecastTTomorrow.wind_deg<337.5){
      this.forecastTTomorrow.wind_deg='SE';
    }else if(this.forecastTTomorrow.wind_deg<360){
      this.forecastTTomorrow.wind_deg='S';}

    if(this.forecastTTTomorrow.wind_deg<22.5){
      this.forecastTTTomorrow.wind_deg='S';
    }else if(this.forecastTTTomorrow.wind_deg<67.5){
      this.forecastTTTomorrow.wind_deg='SW';
    }else if(this.forecastTTTomorrow.wind_deg<112.5){
      this.forecastTTTomorrow.wind_deg='W';
    }else if(this.forecastTTTomorrow.wind_deg<157.5){
      this.forecastTTTomorrow.wind_deg='NW';
    }else if(this.forecastTTTomorrow.wind_deg<202.5){
      this.forecastTTTomorrow.wind_deg='N';
    }else if(this.forecastTTTomorrow.wind_deg<247.5){
      this.forecastTTTomorrow.wind_deg='NE';
    }else if(this.forecastTTTomorrow.wind_deg<292.5){
      this.forecastTTTomorrow.wind_deg='E';
    }else if(this.forecastTTTomorrow.wind_deg<337.5){
      this.forecastTTTomorrow.wind_deg='SE';
    }else if(this.forecastTTTomorrow.wind_deg<360){
      this.forecastTTTomorrow.wind_deg='S';}
  }

  viewPoints(i: number){
    this.points = this.routes[i].points;
    this.alertOpen = true;
    this.i=i;
  }

  closeIt(){
    this.alertOpen = false;
  }
  
  deleteIt(){
    this.routesService.deleteRoute(this.i);
    this.dataStorageService.storeRoutes();
  }
}
