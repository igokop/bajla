import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { AddKilometersComponent } from './add-kilometers/add-kilometers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KilometersService } from './kilometers.service';
import { MyGearsComponent } from './my-gears/my-gears.component';
import { GearService } from './gear.service';
import { GearClickedComponent } from './my-gears/gear-clicked/gear-clicked.component';
import { EditGearComponent } from './my-gears/edit-gear/edit-gear.component';
import { KilometersClickedComponent } from './add-kilometers/kilometers-clicked/kilometers-clicked.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatTableModule} from '@angular/material/table';
import { DistanceTableComponent } from './home/distance-table/distance-table.component';
import { DistanceMonthlyTableComponent } from './home/distance-monthly-table/distance-monthly-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuthGuard } from './auth-guard-service';
import { AuthService } from './auth.service';
import { DataStorageService } from './data-storage-service';
import { KilometersResolverService } from './kilometers-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { GearResolverService } from './gear-resolver.service';
import { AuthInteceptorService } from './auth/auth.interceptor.service';
import { AlertModelComponent } from './alert-model/alert-model.component';
import { SummaryService } from './summary.service';
import { HeaderBarNewComponent } from './header-bar-new/header-bar-new.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const appRoutes: Routes = [
  { path: 'home', canActivate: [AuthGuard],component: HomeComponent,resolve: [KilometersResolverService, GearResolverService] },
  { path: '', component: AuthComponent},
  { path: 'kilometers', canActivate: [AuthGuard],component: AddKilometersComponent },
  { path: 'gears', canActivate: [AuthGuard], component: MyGearsComponent, children: [
    {path:':id', component: GearClickedComponent}, ]}
  
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
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
    HeaderBarNewComponent
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
    BrowserAnimationsModule
  ],
  providers: [KilometersService, SummaryService, GearService, AuthGuard, AuthService, DataStorageService, {provide: HTTP_INTERCEPTORS, useClass: AuthInteceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
