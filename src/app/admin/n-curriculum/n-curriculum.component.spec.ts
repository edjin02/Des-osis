import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NCurriculumComponent } from './n-curriculum.component';

describe('NCurriculumComponent', () => {
  let component: NCurriculumComponent;
  let fixture: ComponentFixture<NCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NCurriculumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
