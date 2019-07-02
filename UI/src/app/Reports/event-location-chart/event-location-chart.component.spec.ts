import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLocationChartComponent } from './event-location-chart.component';

describe('EventParticipationChartComponent', () => {
  let component: EventLocationChartComponent;
  let fixture: ComponentFixture<EventLocationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLocationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLocationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
