import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewGradeComponent } from './student-view-grade.component';

describe('StudentViewGradeComponent', () => {
  let component: StudentViewGradeComponent;
  let fixture: ComponentFixture<StudentViewGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentViewGradeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentViewGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
