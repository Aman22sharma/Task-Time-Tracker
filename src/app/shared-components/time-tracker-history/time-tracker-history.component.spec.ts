import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackerHistoryComponent } from './time-tracker-history.component';

describe('TimeTrackerHistoryComponent', () => {
  let component: TimeTrackerHistoryComponent;
  let fixture: ComponentFixture<TimeTrackerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTrackerHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTrackerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
