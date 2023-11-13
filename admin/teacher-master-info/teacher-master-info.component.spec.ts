import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMasterInfoComponent } from './teacher-master-info.component';

describe('TeacherMasterInfoComponent', () => {
  let component: TeacherMasterInfoComponent;
  let fixture: ComponentFixture<TeacherMasterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherMasterInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherMasterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
