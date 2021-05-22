import { environment } from '../../environments/environment'
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, OnChanges } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lng = 17.03;
  lat = 51.10;
  cords: any;

  constructor(private mapService: MapService) { }
  ngOnInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set('pk.eyJ1IjoiaWdvcjEyMzQ1Njc4OTEwIiwiYSI6ImNrb3F2aDcyODB4MjMydXN6eXd2Zmt5cmUifQ.diqWh4ahILbX01jYenWo1w');
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    // Add map controls
    // this.map.addControl(new mapboxgl.NavigationControl({
     
    // }));
    // this.map.addControl(new mapboxgl.AttributionControl({
    //   compact: true
    // }))
    var marker1 = new mapboxgl.Marker({
      draggable : true,
    })
    .setLngLat([17.03, 51.10])
    .addTo(this.map);

    marker1.on('drag', ()=> {
      this.cords = marker1.getLngLat()    
    })
  }
  move(){
    this.mapService.moveCords(this.cords);
  }
}