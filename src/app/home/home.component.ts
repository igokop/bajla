import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../data-storage-service';
import { Distance } from '../distance.model';
import { Gear } from '../gear.model';
import { GearService } from '../gear.service';
import { KilometersService } from '../kilometers.service';
import { Monthly } from '../monthly.model';

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
export class HomeComponent implements OnInit, OnDestroy {
gears: Gear[]=[];
summaryGears: Gear[]=[];
kilometers: Distance[]=[];
kilometersMonthly: Monthly[]=[];
private subscription: Subscription;
  constructor(private gearService: GearService, private dataStorageService: DataStorageService, private kilometersService: KilometersService) { }

  ngOnInit(): void {
    this.dataStorageService.getGears();
    this.dataStorageService.getKilometers();
    this.kilometersService.addKilometersMonthly(); // to będzie zzerac duzo pamieci, przenies gdzies zeby sie robilo tylko raz
    this.kilometersMonthly=this.kilometersService.kilometersMonthly;
    this.gears = this.gearService.gears;
    this.summaryGears = this.gearService.gears;

    for(let i=0; i<this.gearService.gears.length ; i++)
    {
      for(let j=0; j<this.kilometersService.kilometers.length; j++)
      { 
        const dataGear = new Date(this.summaryGears[i].buyDate);
        const dataDistance = new Date(this.kilometersService.kilometers[j].date);
        const timeGear=dataGear.getTime();
        const timeDistance=dataDistance.getTime();

        if(timeGear < timeDistance){
          this.summaryGears[i].kilometersAmmount=+this.summaryGears[i].kilometersAmmount + +this.kilometersService.kilometers[j].amount;
        }
      }
      this.gearService.gears[i].procent = (this.gearService.gears[i].kilometersAmmount / this.gearService.gears[i].interval)*100;
      this.gearService.gears[i].left = this.gearService.gears[i].interval - this.gearService.gears[i].kilometersAmmount;
    }

  }
  
  ngOnDestroy(){
    this.gearService = null;
  }


}
