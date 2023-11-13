import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCurriculumComponent } from './admin-curriculum.component';

describe('AdminCurriculumComponent', () => {
  let component: AdminCurriculumComponent;
  let fixture: ComponentFixture<AdminCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCurriculumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
