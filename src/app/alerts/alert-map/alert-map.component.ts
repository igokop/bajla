import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../../services/data-storage-service';

@Component({
  selector: 'app-alert-map',
  templateUrl: './alert-map.component.html',
  styleUrls: ['./alert-map.component.css'],
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
export class AlertMapComponent implements OnInit {
@Output() close = new EventEmitter<void>();
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }
  closeIt(){
    this.close.emit();
  }
  
}
