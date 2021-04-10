import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage-service';
import { AuthentService } from '../auth/authen.service';
import { Router } from '@angular/router';
import { StravaService } from '../services/strava.service';

@Component({
  selector: 'app-header-bar-new',
  templateUrl: './header-bar-new.component.html',
  styleUrls: ['./header-bar-new.component.css']
})
export class HeaderBarNewComponent implements OnInit{
  photo:any;
  logged = false;
  openedAlert = false;
  userDataEmail: string;
  userData: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private stravaService: StravaService, private router: Router, private breakpointObserver: BreakpointObserver,private authService: AuthService, private dataStorageService: DataStorageService, private authentService:AuthentService) {}
  ngOnInit(): void {
    this.authentService.user.subscribe(user =>{
      if(user){
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
    this.stravaService.stravaProfile.subscribe(data=>{
      this.photo = data;
      this.dataStorageService.storePhoto(data)})
    this.dataStorageService.getPhotos.subscribe(photo =>{
      this.photo=photo;
      });
  }

  getUserData(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  logOut(){
    this.authentService.logout();
    this.changeAlertState();
  }

  changeAlertState(){
    this.openedAlert = !this.openedAlert;
    this.getUserData();
  }

  swipeRight(){
    if(this.router.url === '/routes'){
      this.router.navigate(['/kilometers']);
    }
    if(this.router.url === '/kilometers'){
      this.router.navigate(['/gears']);
    }
    if(this.router.url === '/gears'){
      this.router.navigate(['/home']);
    }


  }

  swipeLeft(){
    if(this.router.url === '/home'){
      this.router.navigate(['/gears']);
    }
    if(this.router.url === '/gears'){
      this.router.navigate(['/kilometers']);
    }
    if(this.router.url === '/kilometers'){
      this.router.navigate(['/routes']);
    }
  }
    
    
  stravaButton(){
    // window.open("https://www.strava.com/oauth/authorize?client_id=64364&response_type=code&redirect_uri=http://localhost:4200/exchange_token&approval_prompt=force&scope=activity:read_all", "_self");
    window.open("https://www.strava.com/oauth/authorize?client_id=64364&response_type=code&redirect_uri=https://bajla-bike.web.app/exchange_token&approval_prompt=force&scope=activity:read_all", "_self");
    // this.stravaService.getDataFromStrava();
  }
  
}
