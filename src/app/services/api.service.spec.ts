import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

// ! session 3
// ! using the angular TestBed
// ! to test the api service

describe('The API Service', () => {
  let apiService: ApiService;
  // * http client double to spy and stub http calls
  let httpTestingController: HttpTestingController;

  describe('The DELETE operations', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], // * http client module fake
      });
      // * ask for the sut instance
      apiService = TestBed.inject(ApiService);
      // * ask for the httpClient double
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      // * don`t forget to check all of your pending untested requests
      httpTestingController.verify();
    });

    it('should call the delete method with the right url', () => {
      const input = 'space-y';
      apiService.deleteAgency$(input).subscribe();
      const expectedUrl = 'http://localhost:3000/agencies/space-y';
      // * expect and assert that the http client double has been called with the right url
      const controller = httpTestingController.expectOne(expectedUrl);
      // * use the controller to assert more things about the request
      const expectedMethod = 'DELETE';
      expect(controller.request.method).toEqual(expectedMethod);
    });
  });

  describe('The GET operations', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      apiService = TestBed.inject(ApiService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(apiService).toBeTruthy();
    });

    it('should call the http client get method with the right url', () => {
      // ToDo: student exercise
      apiService.getAgencies$().subscribe();
      const expectedUrl = 'http://localhost:3000/agencies';
      const controller = httpTestingController.expectOne(expectedUrl);
      const expectedMethod = 'GET';
      expect(controller.request.method).toEqual(expectedMethod);
    });

    it('should return right data when calling get method ', () => {
      const expected = [
        {
          id: 'space-y',
          name: 'Space Y',
          range: 'Interplanetary',
          status: 'Active',
        },
        {
          id: 'green-origin',
          name: 'Green Origin',
          range: 'Orbital',
          status: 'Active',
        },
      ];
      apiService.getAgencies$().subscribe((actual) => {
        expect(actual).toEqual(expected);
      });
      // * prepare the http client double to return the expected data
      const expectedUrl = 'http://localhost:3000/agencies';
      const controller = httpTestingController.expectOne(expectedUrl);
      const output = [
        {
          id: 'space-y',
          name: 'Space Y',
          range: 'Interplanetary',
          status: 'Active',
        },
        {
          id: 'green-origin',
          name: 'Green Origin',
          range: 'Orbital',
          status: 'Active',
        },
      ];
      // * flush the predefined response (like a stub)
      controller.flush(output);
    });
  });

  describe('The POST operations using a double of utilsService', () => {
    const outputId = 'space-y';
    beforeEach(() => {
      // * predefined response for any call
      const utilsServiceStub = {
        getHyphened: (source: string) => outputId,
      };
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], // * http client module fake
        providers: [
          {
            provide: UtilsService, // * Dependency to be injected
            useValue: utilsServiceStub, // * stub to be injected instead of the real one
          },
        ],
      });
      apiService = TestBed.inject(ApiService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call post method with the right url and payload', () => {
      const input = {
        id: '',
        name: 'Space Y',
        range: 'Interplanetary',
        status: 'Active',
      };
      apiService.postAgency$(input).subscribe();
      const expectedUrl = 'http://localhost:3000/agencies';
      const controller = httpTestingController.expectOne(expectedUrl);
      const expectedMethod = 'POST';
      expect(controller.request.method).toEqual(expectedMethod);
      const expectedPayload = {
        id: outputId, // * stubbed output
        name: 'Space Y',
        range: 'Interplanetary',
        status: 'Active',
      };
      expect(controller.request.body).toEqual(expectedPayload);
      // ! post methods have two responsibilities and should be refactored
      // ! avoiding dependencies like utilsService at this level
    });
  });
});
