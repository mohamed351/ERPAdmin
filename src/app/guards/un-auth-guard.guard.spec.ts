import { TestBed } from '@angular/core/testing';

import { UnAuthGuardGuard } from './un-auth-guard.guard';

describe('UnAuthGuardGuard', () => {
  let guard: UnAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
