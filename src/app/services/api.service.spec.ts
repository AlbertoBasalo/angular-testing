import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

describe('The API Service', () => {
  let sut: ApiService;
  // ! http client spy and mock
  let httpTestingController: HttpTestingController;
  const outputId = 'space-y';

  beforeEach(() => {
    // ! predefined response for any call
    const utilsServiceStub = {
      getHyphened: (source: string) => outputId,
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ! http client module fake
      providers: [
        {
          provide: UtilsService, // * Dependency to be injected
          useValue: utilsServiceStub, // ! stub to be injected instead of the real one
        },
      ],
    });
    sut = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // ! not forget to check all of your pending untested requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should call the http client get method with the right url', () => {
    // Arrange
    // Act
    sut.getAgencies$().subscribe();
    // Assert
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    const expectedMethod = 'GET';
    expect(controller.request.method).toEqual(expectedMethod);
  });

  it('should return right data when calling get method ', () => {
    // Arrange
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
    // Act
    sut.getAgencies$().subscribe((actual) => {
      // Assert
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
      expect(actual).toEqual(expected);
    });
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    controller.flush(output); // ! flush the predefined response (like a stub)
  });

  it('should call post method with the right url and payload', () => {
    // Arrange
    const input = {
      id: '',
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    };
    // Act
    sut.postAgency$(input).subscribe();
    // Assert
    const expectedUrl = 'http://localhost:3000/agencies';
    const controller = httpTestingController.expectOne(expectedUrl);
    const expectedMethod = 'POST';
    expect(controller.request.method).toEqual(expectedMethod);
    const expectedPayload = {
      id: outputId, // ! stubbed output (sut method with two responsibilities)
      name: 'Space Y',
      range: 'Interplanetary',
      status: 'Active',
    };
    expect(controller.request.body).toEqual(expectedPayload);
  });

  it('should call the delete method with the right url', () => {
    // Arrange
    const input = 'space-y';
    // Act
    sut.deleteAgency$(input).subscribe();
    // Assert
    const expectedUrl = 'http://localhost:3000/agencies/space-y';
    const controller = httpTestingController.expectOne(expectedUrl);
    const expectedMethod = 'DELETE';
    expect(controller.request.method).toEqual(expectedMethod);
  });
});
