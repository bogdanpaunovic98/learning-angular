import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminPageGuard } from './admin-page.guard';

describe('adminPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
