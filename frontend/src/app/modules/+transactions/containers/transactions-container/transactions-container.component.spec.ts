import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsContainerComponent } from './transactions-container.component';

describe('TransactionsContainerComponent', () => {
  let component: TransactionsContainerComponent;
  let fixture: ComponentFixture<TransactionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
