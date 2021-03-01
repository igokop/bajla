import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Gear } from 'src/app/gear.model';

@Component({
  selector: 'app-gear-clicked',
  templateUrl: './gear-clicked.component.html',
  styleUrls: ['./gear-clicked.component.css'],
  animations: [
    trigger('list', [
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateX(-100px)'
        }),
        animate(400)
    ])
  ]),]
})
export class GearClickedComponent implements OnInit {
@Input() index: number;
@Input() gear: Gear;
  constructor() { }

  ngOnInit(): void {
    
  }

}
