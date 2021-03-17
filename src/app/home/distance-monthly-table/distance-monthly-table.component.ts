import { animate, style, transition, trigger } from '@angular/animations';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Distance } from 'src/app/models/distance.model';
import { KilometersService } from 'src/app/services/kilometers.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-distance-monthly-table',
  templateUrl: './distance-monthly-table.component.html',
  styleUrls: ['./distance-monthly-table.component.css'],
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
export class DistanceMonthlyTableComponent implements AfterViewInit {
  constructor(private kilometersService: KilometersService){};
  displayedColumns: string[] = ['month', 'amount'];
  @Input() kilometers: Distance[];

 

  dataSource = new MatTableDataSource(this.kilometersService.getMonthlyDistance());

  @ViewChild(MatSort) sort: MatSort;

  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    
  }
  
}
