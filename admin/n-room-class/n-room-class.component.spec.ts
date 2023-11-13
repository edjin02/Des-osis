import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NRoomClassComponent } from './n-room-class.component';

describe('NRoomClassComponent', () => {
  let component: NRoomClassComponent;
  let fixture: ComponentFixture<NRoomClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NRoomClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NRoomClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
