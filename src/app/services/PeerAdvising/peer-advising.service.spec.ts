import { TestBed } from '@angular/core/testing';

import { PeerAdvisingService } from './peer-advising.service';

describe('PeerAAdvisingService', () => {
  let service: PeerAdvisingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerAdvisingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
