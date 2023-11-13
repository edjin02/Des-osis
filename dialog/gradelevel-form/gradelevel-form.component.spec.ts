import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradelevelFormComponent } from './gradelevel-form.component';

describe('GradelevelFormComponent', () => {
  let component: GradelevelFormComponent;
  let fixture: ComponentFixture<GradelevelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradelevelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradelevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
