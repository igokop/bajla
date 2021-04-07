import { LayoutModule } from '@angular/cdk/layout';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderBarNewComponent } from './header-bar-new.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KilometersService } from '../services/kilometers.service';
import { GearService } from '../services/gear.service';
import { By } from '@angular/platform-browser';

class routerStub {
    navigate(params){
    }
}

describe('HeaderBarNewComponent', () => {
  let component: HeaderBarNewComponent;
  let fixture: ComponentFixture<HeaderBarNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderBarNewComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        HttpClientModule
      ],
      providers: [
          { provide: Router, useClass: routerStub },
          AuthService,
          DataStorageService,
          KilometersService,
          GearService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect user after click button to kilometers', ()=>{
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');

    let button = fixture.debugElement.query(By.css('.add-kilometers'))
    let href = button.nativeElement.getAttribute('routerLink');

    expect(href).toEqual('/kilometers');

    router.navigate([href]);

    let route = '/kilometers'

    expect(spy).toHaveBeenCalledWith( [ route ] )
  })
});
