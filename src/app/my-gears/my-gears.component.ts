import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../services/data-storage-service';
import { Gear } from '../models/gear.model';
import { GearService } from '../services/gear.service';


@Component({
  selector: 'app-my-gears',
  templateUrl: './my-gears.component.html',
  styleUrls: ['./my-gears.component.css'],
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
export class MyGearsComponent implements OnInit {
  gears: Gear[];
  added = false;
  showModal: boolean;
  showModal2: boolean;
  gearForm: FormGroup;
  editable: boolean = false;
  deletable: boolean = false;
  i: number;
  alertClosed: boolean = false;
  private subscription: Subscription;

  constructor(private gearService: GearService, private router: Router, private route: ActivatedRoute, private dataStorageService: DataStorageService) { }


  
  ngOnInit(){
    // this.gearService.updateGears.subscribe(data => {
    //   this.gears = data;
    //   console.log(data);
    // })
    this.dataStorageService.getGears();
    this.gears = this.gearService.getGear();
    this.gearForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'date': new FormControl(null,[Validators.required]),
      'interval': new FormControl(null, [Validators.required]),
      'actualDistance': new FormControl(null, [Validators.required])
    });
    this.gearService.gearChanged.subscribe(
      (gears: Gear[]) => {
        this.gears = gears;
      }
    );
    
  }
  
e
  onSubmit() {
    this.added = true;
    if(this.added)
    {
      this.showModal = false;
    }
    this.gearService.addNew(this.gearForm.value.name, this.gearForm.value.date, this.gearForm.value.interval, this.gearForm.value.actualDistance);
    this.gearForm.reset();
    this.dataStorageService.storeGears();
    // this.gearService.synchro();
  }

  show(){
    this.showModal = true;
  }
  show2(i: number){
    if(this.editable){
      this.showModal2 = true;
      this.gearService.startedEditing.next(i);

    } 
    if(this.deletable){
      this.i=i;
      this.alertClosed =true;
    }
  }

  hide(){
    this.showModal = false;
  }
  hide2(){
    this.showModal2 = false;
    this.router.navigate(['./'], {relativeTo: this.route});
    this.editable = !this.editable;
  }
  edit(){
    this.editable = !this.editable;
  }
  delete(){
    this.deletable = !this.deletable;
  }
  
  deleteIt(){
    this.gearService.deleteGear(this.i);
    this.alertClosed = false;
    this.deletable = !this.deletable;
  }
  openAlert(i:number){
    if(this.deletable){
      this.i = i;
      this.alertClosed = true;
    }
  }
  closeIt(){
    this.alertClosed = false;
    this.deletable = !this.deletable;
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
  
}
  
  

  

  