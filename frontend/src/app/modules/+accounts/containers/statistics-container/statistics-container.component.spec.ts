import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsContainerComponent } from './statistics-container.component';

describe('StatisticsContainerComponent', () => {
  let component: StatisticsContainerComponent;
  let fixture: ComponentFixture<StatisticsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
