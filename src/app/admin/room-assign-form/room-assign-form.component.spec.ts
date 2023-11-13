import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAssignFormComponent } from './room-assign-form.component';

describe('RoomAssignFormComponent', () => {
  let component: RoomAssignFormComponent;
  let fixture: ComponentFixture<RoomAssignFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAssignFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAssignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
