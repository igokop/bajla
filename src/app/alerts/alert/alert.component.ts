import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
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
export class AlertComponent implements OnInit {
@Input() message: string;
@Output() close = new EventEmitter<void>();
@Output() delete = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {
  }
  closeIt(){
    this.close.emit();
  }
}


