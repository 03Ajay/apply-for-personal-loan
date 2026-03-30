import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDesktopSidebar } from './common-desktop-sidebar';

describe('CommonDesktopSidebar', () => {
  let component: CommonDesktopSidebar;
  let fixture: ComponentFixture<CommonDesktopSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonDesktopSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonDesktopSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
