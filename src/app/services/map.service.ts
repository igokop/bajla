import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class MapService {

  constructor() { }
  @Output() mapCords: EventEmitter<any> = new EventEmitter();
  moveCords(cords){
    this.mapCords.emit(cords);
  }
}
