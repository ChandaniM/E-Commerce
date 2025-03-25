import { TestBed } from '@angular/core/testing';

import { ResponseMapperServiceService } from './response-mapper-service.service';

describe('ResponseMapperServiceService', () => {
  let service: ResponseMapperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseMapperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
