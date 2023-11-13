import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradeFormComponent } from './student-grade-form.component';

describe('StudentGradeFormComponent', () => {
  let component: StudentGradeFormComponent;
  let fixture: ComponentFixture<StudentGradeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGradeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGradeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
