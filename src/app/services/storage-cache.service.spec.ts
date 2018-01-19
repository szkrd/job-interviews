import { TestBed, inject } from '@angular/core/testing';

import { StorageCacheService } from './storage-cache.service';

describe('StorageCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageCacheService]
    });
  });

  it('should be created', inject([StorageCacheService], (service: StorageCacheService) => {
    expect(service).toBeTruthy();
  }));
});
