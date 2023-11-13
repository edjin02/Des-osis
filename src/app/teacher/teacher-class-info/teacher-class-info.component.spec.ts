import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassInfoComponent } from './teacher-class-info.component';

describe('TeacherClassInfoComponent', () => {
  let component: TeacherClassInfoComponent;
  let fixture: ComponentFixture<TeacherClassInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherClassInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherClassInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
