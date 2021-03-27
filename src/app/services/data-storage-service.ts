import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Distance } from "../models/distance.model";
import { Gear } from "../models/gear.model";
import { GearService } from "./gear.service";
import { KilometersService } from "./kilometers.service";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthentService } from "../auth/authen.service";
import { RoutesService } from "./routes.service";
import { Route } from "../models/route.model";

@Injectable()
export class DataStorageService{    
    constructor(private routesService: RoutesService, private http: HttpClient, private kilometersService: KilometersService, private gearService: GearService, private authentService: AuthentService){}
    @Output() getDonation: EventEmitter<any> = new EventEmitter();

    storeKilometers(){
        this.authentService.user.subscribe(user => {
            const distance = this.kilometersService.getDistance();
            this.http.put('https://bajla-bike-default-rtdb.firebaseio.com/' + user.id + '/distance.json', distance).subscribe(response=>{console.log(response)});
        })
        // const userData = JSON.parse(localStorage.getItem('userData'));
        // const distance = this.kilometersService.getDistance();
        // this.http.put('https://ng-complete-guide-cd0cd-default-rtdb.firebaseio.com/' + userData.id + '/distance.json', distance).subscribe(response=>{console.log(response)});
    }

    storeGears(){
        this.authentService.user.subscribe(user => {
            const gears = this.gearService.getGear();
        this.http.put('https://bajla-bike-default-rtdb.firebaseio.com/'+ user.id +'/gears.json', gears).subscribe(response=>{console.log(response)});
        })
    }
    getKilometers(){
        const userData = JSON.parse(localStorage.getItem('userData'));
        return this.authentService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Distance[]>('https://bajla-bike-default-rtdb.firebaseio.com/' + userData.id +'/distance.json')
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
            return this.http.get<Gear[]>('https://bajla-bike-default-rtdb.firebaseio.com/'+ userData.id + '/gears.json')
        }),
        tap(gears => {
            if(gears){
                this.gearService.getGearsFromServer(gears);
            }
        }));
    };
    
    getRoutes(){
        const userData =JSON.parse(localStorage.getItem('userData'));
        this.http.get<Route[]>('https://bajla-bike-default-rtdb.firebaseio.com/'+ userData.id + '/routes.json').subscribe(routes=>{
        if(routes){
            this.routesService.routes = routes;
        }
        });
    }

    storeRoutes(){
        this.authentService.user.subscribe(user => {
            const routes = this.routesService.getRoutes();
        this.http.put('https://bajla-bike-default-rtdb.firebaseio.com/'+ user.id +'/routes.json', routes).subscribe(response=>{console.log(response)});
        })
    }

    storeDonations(donators){
        this.http.put('https://bajla-bike-default-rtdb.firebaseio.com/donations.json', donators).subscribe(response=>{console.log(response)});
    }

    getDonations(){
        this.http.get('https://bajla-bike-default-rtdb.firebaseio.com/donations.json').subscribe(donators =>{
            this.getDonation.emit(donators);
        })
    }


    
}
    
  
  
