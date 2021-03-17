import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage-service';
import { Route } from 'src/app/models/route.model';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent implements OnInit {
  newSimpleRoute: FormGroup;
  constructor(private routesService: RoutesService, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.newSimpleRoute = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'distance': new FormControl(null, Validators.required),
      'startCity': new FormControl(null, Validators.required),
      'destinationCity': new FormControl(null, Validators.required),
      'direction': new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    let opositeDirection:number = 0;
    if(this.newSimpleRoute.value.direction <= 180){
      opositeDirection = +this.newSimpleRoute.value.direction +180;
    }else if(this.newSimpleRoute.value.direction > 180){
      opositeDirection = +this.newSimpleRoute.value.direction -180;}
    const route: Route = {
      name: this.newSimpleRoute.value.name,
      distance: this.newSimpleRoute.value.distance,
      temperature: 0,
      avgSpeed: 0,
      points: [
        { name: this.newSimpleRoute.value.startCity,
          direction: opositeDirection,
          windDirection: 0,
          windSpeed: 0,
          correct: 0,
          comeBack: true},
        { name: this.newSimpleRoute.value.destinationCity,
          direction: this.newSimpleRoute.value.direction,
          windDirection: 0,
          windSpeed: 0,
          correct: 0,
          comeBack: false}],
      correct: 0
    };
    this.routesService.addNewRoute(route);
    this.router.navigate(['routes']);
    this.dataStorageService.storeRoutes();

  }
}
