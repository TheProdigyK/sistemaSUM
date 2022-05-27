import { TestBed } from '@angular/core/testing';

import { ProcesadoService } from './procesado.service';

describe('ProcesadoService', () => {
  let service: ProcesadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
