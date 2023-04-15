import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenArquivoComponent } from './open-arquivo.component';

describe('OpenArquivoComponent', () => {
  let component: OpenArquivoComponent;
  let fixture: ComponentFixture<OpenArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenArquivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
