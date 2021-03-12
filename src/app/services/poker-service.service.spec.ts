import { TestBed } from '@angular/core/testing';

import { PokerService } from './poker.service';

describe('PokerServiceService', () => {
  let service: PokerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
