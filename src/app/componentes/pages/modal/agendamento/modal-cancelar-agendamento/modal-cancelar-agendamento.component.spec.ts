import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelarAgendamentoComponent } from './modal-cancelar-agendamento.component';

describe('ModalCancelarAgendamentoComponent', () => {
  let component: ModalCancelarAgendamentoComponent;
  let fixture: ComponentFixture<ModalCancelarAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCancelarAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCancelarAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
