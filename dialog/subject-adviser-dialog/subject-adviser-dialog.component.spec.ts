import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAdviserDialogComponent } from './subject-adviser-dialog.component';

describe('SubjectAdviserDialogComponent', () => {
  let component: SubjectAdviserDialogComponent;
  let fixture: ComponentFixture<SubjectAdviserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectAdviserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectAdviserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
