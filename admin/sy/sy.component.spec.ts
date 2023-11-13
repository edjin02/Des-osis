import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyComponent } from './sy.component';

describe('SyComponent', () => {
  let component: SyComponent;
  let fixture: ComponentFixture<SyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
