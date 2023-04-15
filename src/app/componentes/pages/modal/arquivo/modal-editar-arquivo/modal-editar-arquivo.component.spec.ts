import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarArquivoComponent } from './modal-editar-arquivo.component';

describe('ModalEditarArquivoComponent', () => {
  let component: ModalEditarArquivoComponent;
  let fixture: ComponentFixture<ModalEditarArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditarArquivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
