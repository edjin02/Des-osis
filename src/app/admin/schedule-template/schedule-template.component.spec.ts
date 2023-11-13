import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTemplateComponent } from './schedule-template.component';

describe('ScheduleTemplateComponent', () => {
  let component: ScheduleTemplateComponent;
  let fixture: ComponentFixture<ScheduleTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
