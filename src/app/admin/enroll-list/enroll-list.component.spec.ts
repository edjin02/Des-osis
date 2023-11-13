import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollListComponent } from './enroll-list.component';

describe('EnrollListComponent', () => {
  let component: EnrollListComponent;
  let fixture: ComponentFixture<EnrollListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
