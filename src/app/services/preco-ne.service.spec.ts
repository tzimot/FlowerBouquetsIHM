import { TestBed } from '@angular/core/testing';

import { PrecoNEService } from './preco-ne.service';

describe('PrecoNEService', () => {
  let service: PrecoNEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecoNEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
