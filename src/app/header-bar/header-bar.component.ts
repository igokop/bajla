import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthentService } from '../auth/authen.service';
import { DataStorageService } from '../data-storage-service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})

export class HeaderBarComponent implements OnInit {
  logged = false;
  constructor(private authService: AuthService, private dataStorageService: DataStorageService, private authentService:AuthentService){}
  ngOnInit(): void {
    this.authentService.user.subscribe(user =>{
      if(user){
        this.logged = true;
      } else {
        this.logged = false;
      }
    })
  }
  logOut(){
    this.authentService.logout();
  }
  
  

}
