import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEnrollmentComponent } from './event-enrollment.component';

describe('EventEnrollmentComponent', () => {
  let component: EventEnrollmentComponent;
  let fixture: ComponentFixture<EventEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
