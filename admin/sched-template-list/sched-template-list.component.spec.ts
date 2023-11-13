import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedTemplateListComponent } from './sched-template-list.component';

describe('SchedTemplateListComponent', () => {
  let component: SchedTemplateListComponent;
  let fixture: ComponentFixture<SchedTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedTemplateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
