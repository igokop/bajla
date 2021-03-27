import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  @Output()routesUpdate: EventEmitter<any> = new EventEmitter();
  @Output()forecastUpdate: EventEmitter<any> = new EventEmitter();
  forecast: any;
  cityNameForecast = 'Wroclaw';
  routes: Route[]=[];
  constructor(private http: HttpClient) { }

  getForecastData(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=51.1&lon=17.0333&exclude=hourly&appid=5e37c2fbddf98133163d1f3b26ca7ba4')
        .then(response => response.json())
        .then(data => {
          this.forecast = data;
          this.forecastUpdate.emit(this.forecast);
        });
  }


  getWeatherData(){
    for(let i=0; i<this.routes.length; i++)
    {
      this.routes[i].avgSpeed = 0;
      for(let j=0; j<this.routes[i].points.length; j++)
      {
        const cityName = this.routes[i].points[j].name;
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&appid=5e37c2fbddf98133163d1f3b26ca7ba4')
        .then(response => response.json())
        .then(data => {
          this.setWeatherPoints(data, i, j);
          this.routes[i].temperature = data.main.temp - 273;
          this.routes[i].temperature = Math.round(this.routes[i].temperature*10)/10.0;
          if(j === this.routes[i].points.length-1)
          {
            this.avgSpeed(i);
          }
        });
      }
    }
  }
  
  setWeatherPoints(data: any, i:number, j:number){
    this.routes[i].points[j].windDirection = data.wind.deg;
    this.routes[i].points[j].windSpeed = data.wind.speed * 3.6;
    this.routes[i].points[j].windSpeed = Math.round(this.routes[i].points[j].windSpeed *10)/10.0;

    

      
      const difference = Math.abs(this.routes[i].points[j].direction - this.routes[i].points[j].windDirection)%360;
      if(difference < 45){
        this.routes[i].points[j].correct = 25;
      } else if(difference < 90){
        this.routes[i].points[j].correct = 50;
      } else if(difference < 135){
        this.routes[i].points[j].correct = 75;}
        else if(difference < 180){
          this.routes[i].points[j].correct = 100;
        } else if( difference < 225){
          this.routes[i].points[j].correct = 100;
        } else if( difference < 270){
          this.routes[i].points[j].correct = 75;
        } else if ( difference < 315){
          this.routes[i].points[j].correct = 50;
        } else if( difference <= 360){
          this.routes[i].points[j].correct = 25;
        }
      
      this.routes[i].avgSpeed = this.routes[i].avgSpeed + this.routes[i].points[j].windSpeed;
  }

  go(){
    for(let i=0;i<this.routes.length; i++){
      let backwards: number=0;
      let ahead: number=0;
      let backwardsI: number=0;
      let aheadI: number=0;
      for(let j=0; j<this.routes[i].points.length; j++){
        if(this.routes[i].points[j].comeBack){backwards = backwards + this.routes[i].points[j].correct; backwardsI++;}
        else {ahead = ahead + this.routes[i].points[j].correct; aheadI++}
      }
      if(this.routes[i].avgSpeed < 10){this.routes[i].correct = 1}
      else if((backwards/backwardsI) <= (ahead/aheadI)){
        this.routes[i].correct = 2;
        backwards = 0;
        ahead = 0;
        backwardsI = 0;
        aheadI = 0;
      }else if((backwards/backwardsI) > (ahead/aheadI)){
        this.routes[i].correct = 3;
        backwards = 0;
        ahead = 0;
        backwardsI = 0;
        aheadI = 0;
      }
    }
    this.routesUpdate.emit(this.routes);
  }
  avgSpeed(i: number){
    this.routes[i].avgSpeed = (this.routes[i].avgSpeed/this.routes[i].points.length);
    this.routes[i].avgSpeed = Math.round(this.routes[i].avgSpeed *10)/10.0;
    this.go();
  }

  addNewRoute(route: Route){
    this.routes.push(route);
  }

  getRoutes(){
    return this.routes;
  }

  deleteRoute(i:number){
    this.routes.splice(i, 1);
  }
}




