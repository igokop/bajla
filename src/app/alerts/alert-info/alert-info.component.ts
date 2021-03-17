import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../../services/data-storage-service';

@Component({
  selector: 'app-alert-info',
  templateUrl: './alert-info.component.html',
  styleUrls: ['./alert-info.component.css'],
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
export class AlertInfoComponent implements OnInit {
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
  deleteIt(){
    this.delete.emit();
  }
  deleteActive(){
    this.deleteActivate = !this.deleteActivate;
  }
  
}
