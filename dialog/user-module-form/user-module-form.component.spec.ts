import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModuleFormComponent } from './user-module-form.component';

describe('UserModuleFormComponent', () => {
  let component: UserModuleFormComponent;
  let fixture: ComponentFixture<UserModuleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserModuleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
