import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLayoutComponent } from './bus-layout.component';

describe('BusLayoutComponent', () => {
  let component: BusLayoutComponent;
  let fixture: ComponentFixture<BusLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
