import { Injectable } from '@angular/core';
import { GearService } from './gear.service';
import { KilometersService } from './kilometers.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private kilometersService: KilometersService, private gearService: GearService) {}
  
}
