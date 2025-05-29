import { TestBed } from '@angular/core/testing';

import { CriarautentService } from './criarautent.service';

describe('CriarautentService', () => {
  let service: CriarautentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriarautentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
