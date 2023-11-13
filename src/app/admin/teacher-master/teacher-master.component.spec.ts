import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMasterComponent } from './teacher-master.component';

describe('TeacherMasterComponent', () => {
  let component: TeacherMasterComponent;
  let fixture: ComponentFixture<TeacherMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
