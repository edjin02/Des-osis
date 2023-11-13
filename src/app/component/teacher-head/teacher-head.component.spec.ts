import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherHeadComponent } from './teacher-head.component';

describe('TeacherHeadComponent', () => {
  let component: TeacherHeadComponent;
  let fixture: ComponentFixture<TeacherHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
