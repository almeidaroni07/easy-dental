import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatusAgendamentoComponent } from './modal-status-agendamento.component';

describe('ModalStatusAgendamentoComponent', () => {
  let component: ModalStatusAgendamentoComponent;
  let fixture: ComponentFixture<ModalStatusAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalStatusAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalStatusAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
