import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleClassViewComponent } from './schedule-class-view.component';

describe('ScheduleClassViewComponent', () => {
  let component: ScheduleClassViewComponent;
  let fixture: ComponentFixture<ScheduleClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleClassViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
