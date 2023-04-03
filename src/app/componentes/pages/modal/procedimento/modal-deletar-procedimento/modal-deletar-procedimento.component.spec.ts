import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeletarProcedimentoComponent } from './modal-deletar-procedimento.component';

describe('ModalDeletarProcedimentoComponent', () => {
  let component: ModalDeletarProcedimentoComponent;
  let fixture: ComponentFixture<ModalDeletarProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeletarProcedimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeletarProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
