import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NTeacherClassComponent } from './n-teacher-class.component';

describe('NTeacherClassComponent', () => {
  let component: NTeacherClassComponent;
  let fixture: ComponentFixture<NTeacherClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NTeacherClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NTeacherClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
