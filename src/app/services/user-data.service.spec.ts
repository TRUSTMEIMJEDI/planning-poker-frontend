import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';

describe('UserService', () => {
  let service: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
