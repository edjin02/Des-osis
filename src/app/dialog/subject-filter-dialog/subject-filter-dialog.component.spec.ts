import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFilterDialogComponent } from './subject-filter-dialog.component';

describe('SubjectFilterDialogComponent', () => {
  let component: SubjectFilterDialogComponent;
  let fixture: ComponentFixture<SubjectFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectFilterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
