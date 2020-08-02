import { TestBed } from '@angular/core/testing';

import { PeerAAdvisingService } from './peer-aadvising.service';

describe('PeerAAdvisingService', () => {
  let service: PeerAAdvisingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerAAdvisingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
