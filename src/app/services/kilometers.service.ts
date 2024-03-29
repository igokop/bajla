import { EventEmitter } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Distance } from "../models/distance.model";
import { Monthly } from "../models/monthly.model";


export class KilometersService {
  kilometersNames: any[] = [];
  kilometersChanged = new Subject<Distance[]>();
  getYearly = new EventEmitter;
  kilometers: Distance[]=[];
  kilometersMonthly: Monthly[]=[];
  kilometersYearly: any[]=[];
  done: string[]=[];
  doneYear: string[]=[];
  constructor() { }
  addDaily(date: string, distance: number){
    const newDistance = new Distance (date, distance);
    this.kilometers.push(newDistance);
  }
  addKilometersMonthly(){
    const index = this.kilometers.length;
    for(let i = 0; i<index ; i++){
      const dateD = this.kilometers[i].date.split('-');
      let when = 0;
      const index2 = this.kilometersMonthly.length;
      for(let j=0; j<index2; j++)
      { const dateM = this.kilometersMonthly[j].date.split('-');
        if(dateD[1] == dateM[1] && dateD[0] == dateM[0] && this.done[i] != 'done')
        {
          when++;
          this.kilometersMonthly[j].amount=(+this.kilometersMonthly[j].amount + +this.kilometers[i].amount);
        }
      }if(when==0 && this.done[i] != 'done'){
        const strDash: string = '-';
        const str: string= dateD[0].concat(strDash.toString());
        const str2: string= str.concat(dateD[1].toString());
        const newMonth= new Monthly(str2, this.kilometers[i].amount);
        this.kilometersMonthly.push(newMonth);
      }
      this.done[i]='done';
    }
    
  }
  addKilometersYearly(){
    const index = this.kilometers.length;
    for(let i = 0; i<index ; i++){
      const dateD = this.kilometers[i].date.split('-');
      let when = 0;
      const index2 = this.kilometersYearly.length;
      for(let j=0; j<index2; j++)
      { 
      if(dateD[0] == this.kilometersYearly[j].year && this.doneYear[i] != 'done')
      {
        when++;
        this.kilometersYearly[j].amount=(+this.kilometersYearly[j].amount + +this.kilometers[i].amount);
      }
    }if(when==0 && this.doneYear[i] != 'done'){
      const newYear= {year: dateD[0], amount: this.kilometers[i].amount};
      this.kilometersYearly.push(newYear);
    }
    this.doneYear[i]='done';
  }
  this.getYearly.emit(this.kilometersYearly);
    
  }
  getDistance(){
    return this.kilometers;
  }
  getMonthlyDistance(){
    return this.kilometersMonthly;
  }

  removeDistance(i: number){
    this.kilometers.splice(i,1);
  }

  getKilometersFromServer(newKilometers: Distance[]){
    this.kilometers = newKilometers;
    this.kilometersChanged.next(this.kilometers.slice());
  }
}
