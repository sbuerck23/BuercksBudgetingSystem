import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpenseComponent } from './new-expense.component';

describe('NewExpenseComponent', () => {
  let component: NewExpenseComponent;
  let fixture: ComponentFixture<NewExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
