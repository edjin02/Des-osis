import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserDialogComponent } from './adviser-dialog.component';

describe('AdviserDialogComponent', () => {
  let component: AdviserDialogComponent;
  let fixture: ComponentFixture<AdviserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdviserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
