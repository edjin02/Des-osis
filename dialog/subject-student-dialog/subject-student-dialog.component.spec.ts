import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectStudentDialogComponent } from './subject-student-dialog.component';

describe('SubjectStudentDialogComponent', () => {
  let component: SubjectStudentDialogComponent;
  let fixture: ComponentFixture<SubjectStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectStudentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
