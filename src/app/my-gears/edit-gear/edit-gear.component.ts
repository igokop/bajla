import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/data-storage-service';
import { Gear } from 'src/app/gear.model';
import { GearService } from 'src/app/gear.service';

@Component({
  selector: 'app-edit-gear',
  templateUrl: './edit-gear.component.html',
  styleUrls: ['./edit-gear.component.css']
})
export class EditGearComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<void>();
  subscription: Subscription;
  editedItemIndex: number;
  editedGear: Gear;
  gearFormEdit: FormGroup;
  left: number;
  procent: number;



  constructor(private gearService: GearService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.gearFormEdit = new FormGroup({
      'nameEdit': new FormControl(null,Validators.required),
      'dateEdit': new FormControl(null,[Validators.required]),
      'intervalEdit': new FormControl(null, [Validators.required]),
      'actualDistanceEdit': new FormControl(null, [Validators.required])
    });
    this.subscription=this.gearService.startedEditing.subscribe((index: number)=> {
      this.editedItemIndex=index;
      this.editedGear=this.gearService.getOneGear(index);
      this.gearFormEdit.patchValue({
        'nameEdit': this.editedGear.item,
        'intervalEdit': this.editedGear.interval,
        'actualDistanceEdit': this.editedGear.kilometersAmmount,
        'dateEdit': this.editedGear.buyDate
      });
    });
    
  };
  onSubmit(){
    this.procent=(this.gearFormEdit.value.nameEdit);
    this.left=(this.gearFormEdit.value.intervalEdit-this.gearFormEdit.value.actualDistanceEdit);
    this.procent=(this.gearFormEdit.value.actualDistanceEdit/this.gearFormEdit.value.intervalEdit)*100;
    const newGear = new Gear(this.gearFormEdit.value.nameEdit, this.gearFormEdit.value.actualDistanceEdit, this.gearFormEdit.value.dateEdit, this.gearFormEdit.value.intervalEdit, this.procent, this.left)
    this.gearService.updateGear(this.editedItemIndex, newGear);
    this.gearService.close();
    this.submitClicked.emit();
    this.dataStorageService.storeGears();
  }
  clear(){
    this.gearFormEdit.reset();
    this.gearService.close();
  }
}


