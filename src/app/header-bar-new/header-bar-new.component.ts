import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage-service';
import { AuthentService } from '../auth/authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar-new',
  templateUrl: './header-bar-new.component.html',
  styleUrls: ['./header-bar-new.component.css']
})
export class HeaderBarNewComponent implements OnInit{
  logged = false;
  openedAlert = false;
  userDataEmail: string;
  userData: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private router: Router, private breakpointObserver: BreakpointObserver,private authService: AuthService, private dataStorageService: DataStorageService, private authentService:AuthentService) {}
  ngOnInit(): void {
    this.authentService.user.subscribe(user =>{
      if(user){
        this.logged = true;
      } else {
        this.logged = false;
      }
    })
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
  
}
