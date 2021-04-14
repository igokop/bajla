import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from '../services/data-storage-service';
import { KilometersService } from '../services/kilometers.service';
import { StravaService } from '../services/strava.service';

@Component({
  selector: 'app-login-done',
  templateUrl: './login-done.component.html',
  styleUrls: ['./login-done.component.css']
})
export class LoginDoneComponent implements OnInit {

  constructor(private kilometersService:KilometersService, private dataStorageService:DataStorageService, private stravaService:StravaService, private router:Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParams['code'];
    this.stravaService.getToken(code);

    setTimeout(()=>{
      const kilometers = this.stravaService.getDistances();
      const names = this.stravaService.getNames();
      this.dataStorageService.storeNames(names);
      this.dataStorageService.storeKilometersStrava(kilometers);
      this.kilometersService.kilometers = kilometers;
      this.router.navigate(['home']);
    }, 5000);
    
  }

}
// this.route.queryParams
//       .filter(params => params.category)
//       .subscribe(params => {
//         console.log(params); // { category: "fiction" }
//         this.category = params.category;
//         console.log(this.category); // fiction
