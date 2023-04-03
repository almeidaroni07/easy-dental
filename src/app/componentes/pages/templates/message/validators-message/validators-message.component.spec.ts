import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorsMessageComponent } from './validators-message.component';

describe('ValidatorsMessageComponent', () => {
  let component: ValidatorsMessageComponent;
  let fixture: ComponentFixture<ValidatorsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorsMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
