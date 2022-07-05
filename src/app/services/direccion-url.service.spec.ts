import { TestBed } from '@angular/core/testing';

import { DireccionURLService } from './direccion-url.service';

describe('DireccionURLService', () => {
  let service: DireccionURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccionURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
