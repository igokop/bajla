import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../services/data-storage-service';
import { Distance } from '../models/distance.model';
import { KilometersService } from '../services/kilometers.service';
@Component({
  selector: 'app-add-kilometers',
  templateUrl: './add-kilometers.component.html',
  styleUrls: ['./add-kilometers.component.css'],
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
export class AddKilometersComponent implements OnInit, OnChanges {
  kilometers: Distance[];
  showModal: boolean;
  showModal2: boolean;
  dailyDistance: FormGroup;
  added = false;
  deletingAllow: boolean = false;
  alertClosed: boolean = false;
  i: number;
  private subscription: Subscription; //subskrypcja - wymagana zeby dane z serwera byly swieze
  constructor(private kilometersService: KilometersService, private dataStorageService: DataStorageService){};


  show(){
    this.showModal = true;
  }

  hide(){
    this.showModal = false;
  }
  delete(){
    if(this.deletingAllow){
    this.kilometersService.removeDistance(this.i);
    this.alertClosed = false;
    this.deletingAllow=!this.deletingAllow;
    }
  }
  activeDeleting(){
    this.deletingAllow = !this.deletingAllow;
  }

  ngOnInit() {
    this.kilometers = this.kilometersService.getDistance();
    this.dailyDistance = new FormGroup({
      'date': new FormControl(null, Validators.required),
      'distance': new FormControl(null, Validators.required)
    })
    this.subscription = this.kilometersService.kilometersChanged //subskrypcja - wymagana zeby dane z serwera byly swieze
      .subscribe(
        (kilometers: Distance[]) => {
          this.kilometers = kilometers;
        }
      );
  }
  
  ngOnChanges(){
    this.kilometers = this.kilometersService.getDistance();
  }

  onSubmit() {
    this.added = true;
    if(this.added)
    {
      this.showModal = false;
    }
    this.kilometersService.addDaily(this.dailyDistance.value.date, this.dailyDistance.value.distance);
    this.dailyDistance.reset();
    this.dataStorageService.storeKilometers();
  }
  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

  closed(){
    this.alertClosed = false;
    this.deletingAllow=!this.deletingAllow;
  }
  openAlert(i: number){
    if(this.deletingAllow){
      this.i = i;
      this.alertClosed = true;
    }
    
    
  }
}