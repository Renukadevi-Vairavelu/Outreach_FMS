import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFeedbackscoreChartComponent } from './event-feedbackscore-chart.component';

describe('EventFeedbackscoreChartComponent', () => {
  let component: EventFeedbackscoreChartComponent;
  let fixture: ComponentFixture<EventFeedbackscoreChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFeedbackscoreChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFeedbackscoreChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
