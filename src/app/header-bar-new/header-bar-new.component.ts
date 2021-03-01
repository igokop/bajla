import { Component, OnChanges, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { DataStorageService } from '../data-storage-service';
import { AuthentService } from '../auth/authen.service';

@Component({
  selector: 'app-header-bar-new',
  templateUrl: './header-bar-new.component.html',
  styleUrls: ['./header-bar-new.component.css']
})
export class HeaderBarNewComponent implements OnInit{
  logged = false;
  userDataEmail: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService: AuthService, private dataStorageService: DataStorageService, private authentService:AuthentService) {}
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
