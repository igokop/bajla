import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { paymentService } from '../services/payment.service';
import { DataStorageService } from '../services/data-storage-service';
import { ThrowStmt } from '@angular/compiler';
 
@Component({
  selector: 'app-stripe-create-token',
  templateUrl: './stripe-create-token.component.html',
  styleUrls: ['./stripe-create-token.component.css']
})
export class StripeCreateTokenComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
 
  donators: any  = [];
  submitted: boolean;
  loading: boolean;
  paymentStatus: any;
  sinceLoading = false;
  test:boolean = false;


  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: 'white',
        color: 'white',
        lineHeight: '60px',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: 'white',
          
        }
      }
    }
  };
 
  elementsOptions: StripeElementsOptions = {
    locale: 'pl'
  };
 
  stripeTest: FormGroup;
 
  constructor(private paymentService: paymentService, private fb: FormBuilder, private stripeService: StripeService, private dataStorageService: DataStorageService) {}
 
  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      amount: [Validators.required]
    });
    this.dataStorageService.getDonations();
    this.dataStorageService.getDonation.subscribe(donators => {
      if(donators){
        this.donators = donators;}
      })
  }
 
  createToken(): void {
    this.sinceLoading = true;
    this.loading = true;
    this.submitted = false;
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          let reqObj = {
            token: result.token,
            amount: this.stripeTest.value.amount*100,
            description: 'Donation ',
          }
          const donat = {
            'name': this.stripeTest.value.name,
            'amount': this.stripeTest.value.amount};
          this.stripeTest.reset();
          this.paymentService.sendToken(reqObj).subscribe(res => {
            if(res['success']){
              this.loading = false;
              this.submitted = true;
              this.paymentStatus = res['status'];
              console.log(donat);
              this.donators.push(donat);
              this.dataStorageService.storeDonations(this.donators);
            } else {
              this.loading = false;
              this.submitted = false;
              this.paymentStatus = res['status'];
            }
          })
        } else if (result.error) {
            this.loading = false;
            this.submitted = false;
            this.paymentStatus = result.error;
        }
      });
  }
  closeIt(){
    this.sinceLoading = false;
  }
  closeTest(){
    this.test = !this.test;
  }
}