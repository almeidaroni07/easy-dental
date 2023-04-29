import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoPacienteComponent } from './modal-info-paciente.component';

describe('ModalInfoPacienteComponent', () => {
  let component: ModalInfoPacienteComponent;
  let fixture: ComponentFixture<ModalInfoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
