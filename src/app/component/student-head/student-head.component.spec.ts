import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHeadComponent } from './student-head.component';

describe('StudentHeadComponent', () => {
  let component: StudentHeadComponent;
  let fixture: ComponentFixture<StudentHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
