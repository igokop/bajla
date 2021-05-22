import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage-service';
import { Route } from 'src/app/models/route.model';
import { RoutesService } from 'src/app/services/routes.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {
  newSimpleRoute: FormGroup;
  step2Active = false;
  step3Active = false;
  cordsTable: any[]=[];
  constructor(private routesService: RoutesService, private router: Router, private dataStorageService: DataStorageService, private mapService: MapService) { }

  ngOnInit(): void {
    this.mapService.mapCords.subscribe(data=>{
      if(data){
        this.cordsTable.push(data);
      }
      if(this.cordsTable.length === 1){
        this.step2Active = false;
        this.step3Active = true;
      }
      if(this.cordsTable.length === 2){
        this.addTrack();
        this.router.navigate(['/routes']);
      }
    })
    
    this.newSimpleRoute = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'distance': new FormControl(null, Validators.required),
      // 'startCity': new FormControl(null, Validators.required),
      // 'destinationCity': new FormControl(null, Validators.required),
      // 'direction': new FormControl(null, Validators.required)
    })
  }

  step1(){
    this.step2Active = true;
  }

  addTrack(){
    let start_latitude  = this.cordsTable[0].lat
    let start_longitude = this.cordsTable[0].lng
    let stop_latitude   = this.cordsTable[1].lat
    let stop_longitude  = this.cordsTable[1].lng

    let y = Math.sin(stop_longitude-start_longitude) * Math.cos(stop_latitude);
    let x = Math.cos(start_latitude)*Math.sin(stop_latitude) -
        Math.sin(start_latitude)*Math.cos(stop_latitude)*Math.cos(stop_longitude-start_longitude);
    let brng = Math.atan2(y, x) * 180 / Math.PI;
    brng = Math.abs(brng);

    let opositeDirection:number = 0;
    if(brng <= 180){
      opositeDirection = brng +180;
    }else if(brng> 180){
      opositeDirection = brng -180;}
    const route: Route = {
      name: this.newSimpleRoute.value.name,
      distance: this.newSimpleRoute.value.distance,
      temperature: 0,
      avgSpeed: 0,
      points: [
        { name: 'Start',
          direction: opositeDirection,
          windDirection: 0,
          windSpeed: 0,
          correct: 0,
          comeBack: true,
          lat: start_latitude,
          lon: start_longitude},
        { name: 'Destination',
          direction: brng,
          windDirection: 0,
          windSpeed: 0,
          correct: 0,
          comeBack: false,
          lat: stop_latitude,
          lon: stop_longitude}],
      correct: 0
    };
    console.log(brng)
    this.routesService.addNewRoute(route);
    this.dataStorageService.storeRoutes();
  }
}
