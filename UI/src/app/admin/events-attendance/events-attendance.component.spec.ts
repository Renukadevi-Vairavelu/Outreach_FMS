import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsAttendanceComponent } from './events-attendance.component';

describe('EventsAttendanceComponent', () => {
  let component: EventsAttendanceComponent;
  let fixture: ComponentFixture<EventsAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
