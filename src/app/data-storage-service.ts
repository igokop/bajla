import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Distance } from "./distance.model";
import { Gear } from "./gear.model";
import { GearService } from "./gear.service";
import { KilometersService } from "./kilometers.service";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthentService } from "./auth/authen.service";

@Injectable()
export class DataStorageService{    
    constructor(private http: HttpClient, private kilometersService: KilometersService, private gearService: GearService, private authentService: AuthentService){}
    
    storeKilometers(){
        this.authentService.user.subscribe(user => {
            const distance = this.kilometersService.getDistance();
            this.http.put('https://ng-complete-guide-cd0cd-default-rtdb.firebaseio.com/' + user.id + '/distance.json', distance).subscribe(response=>{console.log(response)});
        })
        // const userData = JSON.parse(localStorage.getItem('userData'));
        // const distance = this.kilometersService.getDistance();
        // this.http.put('https://ng-complete-guide-cd0cd-default-rtdb.firebaseio.com/' + userData.id + '/distance.json', distance).subscribe(response=>{console.log(response)});
    }

    storeGears(){
        this.authentService.user.subscribe(user => {
            const gears = this.gearService.getGear();
        this.http.put('https://ng-complete-guide-cd0cd-default-rtdb.firebaseio.com/'+ user.id +'/gears.json', gears).subscribe(response=>{console.log(response)});
        })
        
       
        // const userData = JSON.parse(localStorage.getItem('userData'));
        // const gears = this.gearService.getGear();
        // this.http.put('https://ng-complete-guide-cd0cd-default-rtdb.firebaseio.com/'+ userData.id +'/gears.json', gears).subscribe(response=>{console.log(response)});
    }
    getKilometers(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        return this.authentService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Distance[]>('https://ng-complete-guide-cd0cd-default-rtdb.firebaseio.com/' + userData.id +'/distance.json')
        }),
        tap(kilometers =>{
            if(kilometers){
                this.kilometersService.getKilometersFromServer(kilometers);
            }
            }));
        
    }

    getGears(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        return this.authentService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Gear[]>('https://ng-complete-guide-cd0cd-default-rtdb.firebaseio.com/'+ userData.id + '/gears.json')
        }),
        tap(gears => {
            if(gears){
            this.gearService.getGearsFromServer(gears);
        }
        }));
    };
}
    
  
  
