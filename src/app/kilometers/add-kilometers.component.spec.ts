import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage-service';
import { GearService } from '../services/gear.service';
import { KilometersService } from '../services/kilometers.service';
import { AddKilometersComponent } from './add-kilometers.component'
import { KilometersClickedComponent } from './kilometers-clicked/kilometers-clicked.component';

class RouterStub{
  navigate(params){};
}

describe('AddKilometersComponent', () => {
  let component: AddKilometersComponent;
  let fixture: ComponentFixture<AddKilometersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, BrowserAnimationsModule],
      declarations: [ AddKilometersComponent, KilometersClickedComponent ],
      providers: [KilometersService, DataStorageService, GearService, {provide: Router, useClass: RouterStub}, AuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKilometersComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); deleted becouse ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all training days', ()=>{
    fixture.detectChanges();
    component.kilometers = [{amount: 50, date: '12.05.21'}, {amount:60, date: '05.12.20'}];
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.list-group'));
    let el: HTMLElement = de.nativeElement;
    
    expect(el.innerText).toContain('60 km');
  });

  it('should render help-block after click delete button', ()=>{
    component.deletingAllow = true;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.help-block'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toBe('Click position to delete it!');
  })

  it('should show the alert-window after click add distance button', ()=>{
    component.showModal = false;
    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('.add-button'))
    button.triggerEventHandler('click', null);

    expect(component.showModal).toBe(true);
  })

  it('should take data from the firebase database ngOnInit()', ()=>{
    let value = [{amount: 50, date: '12.05.21'}, {amount:60, date: '05.12.20'}];
    let service = TestBed.inject(KilometersService);
    spyOn(service, 'getDistance').and.returnValue(value);

    fixture.detectChanges();
    expect(component.kilometers.length).toBe(2);
  })

});