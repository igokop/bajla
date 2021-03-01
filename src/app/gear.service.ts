import { TOUCH_BUFFER_MS } from "@angular/cdk/a11y";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { KilometersClickedComponent } from "./add-kilometers/kilometers-clicked/kilometers-clicked.component";
import { Gear } from "./gear.model";
import { KilometersService } from "./kilometers.service";

@Injectable()
export class GearService {
    gearChanged = new Subject<Gear[]>();
    startedEditing = new Subject<number>();
    procent: number;
    left: number;  
    closed=true;
    gears: Gear[]=[];
    
    
    constructor(private kilometersService: KilometersService) { }
    getGear(){
        return this.gears;
    }
    addNew(name: string, date: string, interval: number, actualDistance: number){
        this.procent=(actualDistance/interval*100);
        this.left=(interval - actualDistance);
        const newGear = new Gear(name, actualDistance, date, interval, this.procent, this.left);
        this.gears.push(newGear);
    }

    getOneGear(index: number){
        return this.gears[index];
    }
    updateGear(index: number, gear: Gear){
        this.gears[index]=gear;

    }
    deleteGear(index: number){
        this.gears.splice(index, 1);
    }
    close(){
        this.closed=false;
        return this.closed;
    }
    getGearsFromServer(newGears: Gear[]){
      this.gears=newGears;
      this.gearChanged.next(this.gears.slice());
    }
    
    //Dodajemy kilometry z dystansu do przebiegu naszych części:
    //if (date1.getTime() > date2.getTime()) alert("bla");
    synchro(){
        for(let i=0; i<this.kilometersService.kilometers.length; i++){
            for(let j=0; j<this.gears.length; j++){
                if(Date.parse(this.kilometersService.kilometers[i].date) >= Date.parse(this.gears[j].buyDate)){
                    this.gears[j].kilometersAmmount=(+this.gears[j].kilometersAmmount + +this.kilometersService.kilometers[i].amount);
                    this.gearChanged.next(this.gears.slice());
                }
                
            }

        }this.gearChanged.next(this.gears.slice());
    }
    
  }
