import { animate, style, transition, trigger } from '@angular/animations';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Distance } from 'src/app/distance.model';
import { KilometersService } from 'src/app/kilometers.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-distance-table',
  templateUrl: './distance-table.component.html',
  styleUrls: ['./distance-table.component.css'],
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
export class DistanceTableComponent implements AfterViewInit {
  constructor(private kilometersService: KilometersService){};
  displayedColumns: string[] = ['date', 'amount'];
  
 

  dataSource = new MatTableDataSource(this.kilometersService.kilometers);

  @ViewChild(MatSort) sort: MatSort;

  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    
  }
  
}
