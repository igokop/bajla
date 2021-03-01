import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../data-storage-service';

@Component({
  selector: 'app-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class AlertModelComponent implements OnInit {
@Input() message: string;
@Output() close = new EventEmitter<void>();
@Output() delete = new EventEmitter<void>();
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }
  closeIt(){
    this.close.emit();
  }
  deleteIt(){
    this.delete.emit();
    this.dataStorageService.storeGears();
    this.dataStorageService.storeKilometers();
  }
}
