import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarProcedimentoComponent } from './modal-editar-procedimento.component';

describe('ModalEditarProcedimentoComponent', () => {
  let component: ModalEditarProcedimentoComponent;
  let fixture: ComponentFixture<ModalEditarProcedimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarProcedimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarProcedimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
