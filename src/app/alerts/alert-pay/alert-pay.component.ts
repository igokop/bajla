import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../../services/data-storage-service';

@Component({
  selector: 'app-alert-pay',
  templateUrl: './alert-pay.component.html',
  styleUrls: ['./alert-pay.component.css'],
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
export class AlertPayComponent implements OnInit {
@Input() message: string;
@Output() close = new EventEmitter<void>();
@Output() delete = new EventEmitter<void>();
deleteActivate = false;
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }
  closeIt(){
    this.close.emit();
  }
  
}
