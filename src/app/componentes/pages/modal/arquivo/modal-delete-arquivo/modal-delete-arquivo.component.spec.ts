import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteArquivoComponent } from './modal-delete-arquivo.component';

describe('ModalDeleteArquivoComponent', () => {
  let component: ModalDeleteArquivoComponent;
  let fixture: ComponentFixture<ModalDeleteArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeleteArquivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
