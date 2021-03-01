import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Distance } from 'src/app/distance.model';

@Component({
  selector: 'app-kilometers-clicked',
  templateUrl: './kilometers-clicked.component.html',
  styleUrls: ['./kilometers-clicked.component.css'],
  animations: [
      trigger('list', [
        transition('void => *', [
          style({
            opacity: '0',
            transform: 'translateX(-100px)'
          }),
          animate(400)
      ]),
      transition('* => void', [
        animate(400),
        style({
          opacity: '0',
          transform: 'translateX(100px)'
        })
        
    ])
    ]),]
  
})
export class KilometersClickedComponent implements OnInit {
@Input() index: number;
@Input() distance: Distance;
  constructor() { }

  ngOnInit(): void {
  }

}
