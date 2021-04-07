import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AddKilometersComponent } from './kilometers/add-kilometers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KilometersService } from './services/kilometers.service';
import { MyGearsComponent } from './my-gears/my-gears.component';
import { GearService } from './services/gear.service';
import { GearClickedComponent } from './my-gears/gear-clicked/gear-clicked.component';
import { EditGearComponent } from './my-gears/edit-gear/edit-gear.component';
import { KilometersClickedComponent } from './kilometers/kilometers-clicked/kilometers-clicked.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import { DistanceTableComponent } from './home/distance-table/distance-table.component';
import { DistanceMonthlyTableComponent } from './home/distance-monthly-table/distance-monthly-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuthGuard } from './services/auth-guard-service';
import { AuthService } from './services/auth.service';
import { DataStorageService } from './services/data-storage-service';
import { KilometersResolverService } from './services/kilometers-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { GearResolverService } from './services/gear-resolver.service';
import { AuthInteceptorService } from './auth/auth.interceptor.service';
import { AlertModelComponent } from './alerts/alert-model/alert-model.component';
import { SummaryService } from './services/summary.service';
import { HeaderBarNewComponent } from './header-bar-new/header-bar-new.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RoutesComponent } from './routes/routes.component';
import { AddRouteComponent } from './routes/add-route/add-route.component';
import { AlertInfoComponent } from './alerts/alert-info/alert-info.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AlertComponent } from './alerts/alert/alert.component';
import { SimpleComponent } from './routes/add-route/simple/simple.component';
import { RoutesService } from './services/routes.service';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser'
import * as Hammer from 'hammerjs';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeCreateTokenComponent } from './stripe-create-token/stripe-create-token.component';
import { AlertPayComponent } from './alerts/alert-pay/alert-pay.component';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    pinch: { enable: false },
    rotate: { enable: false },
    swipe:{
      threshold:150,
      direction: Hammer.DIRECTION_HORIZONTAL
    }
  }
}

export const appRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuard],component: HomeComponent,resolve: [KilometersResolverService, GearResolverService] },
  { path: '', component: AuthComponent},
  { path: 'routes', canActivate: [AuthGuard], component: RoutesComponent},
  { path: 'createNewRoute', component: AddRouteComponent},
  { path: 'simpleWay', component: SimpleComponent},
  { path: 'kilometers', canActivate: [AuthGuard],component: AddKilometersComponent },
  { path: 'subscription', canActivate: [AuthGuard],component: StripeCreateTokenComponent },
  { path: 'gears', canActivate: [AuthGuard], component: MyGearsComponent, children: [
    {path:':id', component: GearClickedComponent}, ]}
  
]

@NgModule({
  declarations: [
    AppComponent,
    AddKilometersComponent,
    HomeComponent,
    MyGearsComponent,
    GearClickedComponent,
    EditGearComponent,
    KilometersClickedComponent,
    DistanceTableComponent,
    DistanceMonthlyTableComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertModelComponent,
    HeaderBarNewComponent,
    RoutesComponent,
    AddRouteComponent,
    AlertInfoComponent,
    AlertComponent,
    SimpleComponent,
    StripeCreateTokenComponent,
    AlertPayComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NoopAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HammerModule,
    NgxStripeModule.forRoot('pk_test_51IYxfyC4X84AfpFj1Z9TBhDke2AfVKbYHoJha9Ny5LyugUnmmuszRuGQlpGrxJROy9y56vFu4ruGiaU37YDkYoMM00HsNOd3rk')
  ],
  providers: [KilometersService, SummaryService, GearService, AuthGuard, AuthService, RoutesService, DataStorageService, {provide: HTTP_INTERCEPTORS, useClass: AuthInteceptorService, multi: true},{provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig}],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
