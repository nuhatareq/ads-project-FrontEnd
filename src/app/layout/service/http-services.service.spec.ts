/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpServicesService } from './http-services.service';

describe('Service: HttpServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpServicesService]
    });
  });

  it('should ...', inject([HttpServicesService], (service: HttpServicesService) => {
    expect(service).toBeTruthy();
  }));
});
