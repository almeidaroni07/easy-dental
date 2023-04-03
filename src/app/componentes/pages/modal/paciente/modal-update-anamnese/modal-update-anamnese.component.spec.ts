import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateAnamneseComponent } from './modal-update-anamnese.component';

describe('ModalUpdateAnamneseComponent', () => {
  let component: ModalUpdateAnamneseComponent;
  let fixture: ComponentFixture<ModalUpdateAnamneseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateAnamneseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateAnamneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
