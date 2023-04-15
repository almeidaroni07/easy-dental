import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArquivoComponent } from './add-arquivo.component';

describe('AddArquivoComponent', () => {
  let component: AddArquivoComponent;
  let fixture: ComponentFixture<AddArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddArquivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
