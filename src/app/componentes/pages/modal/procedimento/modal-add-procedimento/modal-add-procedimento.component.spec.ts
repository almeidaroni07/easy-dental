import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddProcedimentoComponent } from './modal-add-procedimento.component';

describe('ModalAddProcedimentoComponent', () => {
  let component: ModalAddProcedimentoComponent;
  let fixture: ComponentFixture<ModalAddProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddProcedimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
