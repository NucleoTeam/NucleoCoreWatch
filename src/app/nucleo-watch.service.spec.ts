import { TestBed } from '@angular/core/testing';

import { NucleoWatchService } from './nucleo-watch.service';

describe('NucleoWatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NucleoWatchService = TestBed.get(NucleoWatchService);
    expect(service).toBeTruthy();
  });
});
