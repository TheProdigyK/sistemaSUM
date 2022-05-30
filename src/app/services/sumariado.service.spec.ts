import { TestBed } from '@angular/core/testing';

import { SumariadoService } from './sumariado.service';

describe('SumariadoService', () => {
  let service: SumariadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SumariadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
