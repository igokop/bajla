import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthentService } from './auth/authen.service';
import { DataStorageService } from './services/data-storage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bajla';
  constructor(private dataStorageService: DataStorageService, private AuthentService: AuthentService){}
  
  ngOnInit(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(userData){
      const userDate = new Date(userData._tokenExpirationDate);
      if(new Date().getTime() > userDate.getTime()){
      localStorage.clear();
      }
    }
    this.AuthentService.autoLogin();
  }
  
}
