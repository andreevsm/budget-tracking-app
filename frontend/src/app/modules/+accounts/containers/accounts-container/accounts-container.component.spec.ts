import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsContainerComponent } from './accounts-container.component';

describe('AccountsContainerComponent', () => {
  let component: AccountsContainerComponent;
  let fixture: ComponentFixture<AccountsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
