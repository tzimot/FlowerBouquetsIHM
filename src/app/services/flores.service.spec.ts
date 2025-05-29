import { TestBed } from '@angular/core/testing';

import { FloresService } from './flores.service';

describe('FloresService', () => {
  let service: FloresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
