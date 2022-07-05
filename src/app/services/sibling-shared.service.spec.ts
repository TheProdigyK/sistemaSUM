import { TestBed } from '@angular/core/testing';

import { SiblingSharedService } from './sibling-shared.service';

describe('SiblingSharedService', () => {
  let service: SiblingSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiblingSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
