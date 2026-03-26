import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLoan } from './personal-loan';

describe('PersonalLoan', () => {
  let component: PersonalLoan;
  let fixture: ComponentFixture<PersonalLoan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalLoan],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalLoan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
