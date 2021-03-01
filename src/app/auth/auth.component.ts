import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthentService, AuthResponseData } from './authen.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
loginData: FormGroup;
loginMode = true;
isLoading = false;
error: string = null;

  constructor(private authentService: AuthentService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginData = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required)
    })
  }
  onSubmit(){
    const email = this.loginData.value.email;
    const password = this.loginData.value.password;
    this.isLoading = true;

    let AuthObs: Observable<AuthResponseData>;

    if(this.loginMode){
      AuthObs = this.authentService.logIn(email, password);
    }else{
      AuthObs = this.authentService.signUp(email, password);
    }
    
    this.loginData.reset();

    AuthObs.subscribe(resData =>{
      this.isLoading=false;
      this.authService.login();
      this.router.navigate(['/home'])
    },
    errorMessage =>{
      this.error = errorMessage;
      this.isLoading=false;
    });
  }
  onSwitchMode(){
    this.loginMode=!this.loginMode;
  }

}
