import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../services/data-storage-service';
import { Distance } from '../models/distance.model';
import { Gear } from '../models/gear.model';
import { GearService } from '../services/gear.service';
import { KilometersService } from '../services/kilometers.service';
import { Monthly } from '../models/monthly.model';
import { RoutesService } from '../services/routes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
summaryGears: any[]=[];
kilometers: Distance[]=[];
kilometersMonthly: Monthly[]=[];
millage:number[]=[];
  constructor(private routesService:RoutesService, private dataStorageService: DataStorageService, private gearService:GearService, private kilometersService: KilometersService) { }

  ngOnInit(): void {
    this.dataStorageService.getRoutes();
    this.routesService.getWeatherData();
    this.summaryGears = this.gearService.getGear();
    this.kilometersService.addKilometersMonthly();
    this.kilometersService.addKilometersYearly();
    this.kilometersMonthly=this.kilometersService.kilometersMonthly;
    this.dataStorageService.getPhoto();
    
    
    for(let i=0; i<this.summaryGears.length ; i++)
    {
      let km = 0;
      for(let j=0; j<this.kilometersService.kilometers.length; j++)
      { 
        const dataGear = new Date(this.summaryGears[i].buyDate);
        const dataDistance = new Date(this.kilometersService.kilometers[j].date);
        const timeGear=dataGear.getTime();
        const timeDistance=dataDistance.getTime();
        
        if(timeGear < timeDistance){
           km = km + +this.kilometersService.kilometers[j].amount;
        }
      }
      this.millage.push(km);
      this.summaryGears[i].procent = (this.millage[i] / this.summaryGears[i].interval)*100;
      this.summaryGears[i].left = this.summaryGears[i].interval - this.millage[i];
    }

  }


}
