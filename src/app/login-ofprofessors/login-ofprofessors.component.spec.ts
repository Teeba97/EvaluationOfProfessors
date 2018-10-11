import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOfprofessorsComponent } from './login-ofprofessors.component';

describe('LoginOfprofessorsComponent', () => {
  let component: LoginOfprofessorsComponent;
  let fixture: ComponentFixture<LoginOfprofessorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOfprofessorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOfprofessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
