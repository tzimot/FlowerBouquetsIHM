import { TestBed } from '@angular/core/testing';

import { TopvendasService } from './topvendas.service';

describe('TopvendasService', () => {
  let service: TopvendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopvendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
