import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NSubjecsComponent } from './n-subjecs.component';

describe('NSubjecsComponent', () => {
  let component: NSubjecsComponent;
  let fixture: ComponentFixture<NSubjecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NSubjecsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NSubjecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
