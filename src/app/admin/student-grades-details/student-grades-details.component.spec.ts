import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGradesDetailsComponent } from './student-grades-details.component';

describe('StudentGradesDetailsComponent', () => {
  let component: StudentGradesDetailsComponent;
  let fixture: ComponentFixture<StudentGradesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGradesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGradesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
