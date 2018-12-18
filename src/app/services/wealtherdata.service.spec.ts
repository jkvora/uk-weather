import { TestBed } from '@angular/core/testing';

import { WealtherdataService } from './wealtherdata.service';

describe('WealtherdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WealtherdataService = TestBed.get(WealtherdataService);
    expect(service).toBeTruthy();
  });
});
