import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBulkPreviewComponent } from './student-bulk-preview.component';

describe('StudentBulkPreviewComponent', () => {
  let component: StudentBulkPreviewComponent;
  let fixture: ComponentFixture<StudentBulkPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBulkPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBulkPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
