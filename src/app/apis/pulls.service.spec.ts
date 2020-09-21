import { TestBed } from '@angular/core/testing';

import { PullsService } from './pulls.service';

describe('PullsService', () => {
  let service: PullsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PullsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
