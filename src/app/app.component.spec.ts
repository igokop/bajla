import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataStorageService } from './services/data-storage-service';
import { GearService } from './services/gear.service';
import { KilometersService } from './services/kilometers.service';
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from './services/auth.service';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        AppComponent
      ],
      providers: [HttpClient, HttpHandler, DataStorageService, KilometersService, GearService, AuthService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bajla'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bajla');
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('bajla app is running!');
  });

  it('should have a router outlet', ()=> {
      const fixture = TestBed.createComponent(AppComponent);
      let de = fixture.debugElement.query(By.directive(RouterOutlet));

      expect(de).not.toBe(null)
  })

  xit('should have a link to add kilometers', ()=>{

  })

});
