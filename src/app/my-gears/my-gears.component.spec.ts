import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGearsComponent } from './my-gears.component';

describe('MyGearsComponent', () => {
  let component: MyGearsComponent;
  let fixture: ComponentFixture<MyGearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGearsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
