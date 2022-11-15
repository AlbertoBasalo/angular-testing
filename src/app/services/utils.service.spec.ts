import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from './utils.service';

describe('The Utils Service', () => {
  let service: UtilsService;

  beforeEach(() => {
    // ! activated route double to be injected instead of the real one
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (paramId: string) => (paramId === 'id' ? '1' : null),
        },
      },
    };
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
      ],
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a hyphened string', () => {
    // Arrange
    const input = 'The Moon';
    // Act
    const actual = service.getHyphened(input);
    // Assert
    const expected = 'the-moon';
    expect(actual).toEqual(expected);
  });

  it('should return a hyphened string for complex inputs', () => {
    // Arrange
    const input = 'The #1 email address of The Moon is: moon@earth.sun';
    // Act
    const actual = service.getHyphened(input);
    // Assert
    const expected = 'the-1-email-address-of-the-moon-is-moon-earth-sun';
    expect(actual).toEqual(expected);
  });

  // ! need an activated route to be injected

  it('should get the default param from the ActivatedRoute', () => {
    // Arrange
    const inputRoute = TestBed.inject(ActivatedRoute);
    // Act
    const actual = service.getParam(inputRoute);
    // Assert
    const expected = '1';
    expect(actual).toEqual(expected);
  });

  it('should get the specified param from the ActivatedRoute', () => {
    // Arrange
    const inputRoute = TestBed.inject(ActivatedRoute);
    const inputParam = 'id';
    // Act
    const actual = service.getParam(inputRoute, inputParam);
    // Assert
    const expected = '1';
    expect(actual).toEqual(expected);
  });

  it('should get empty string for not found params', () => {
    // Arrange
    const inputRoute = TestBed.inject(ActivatedRoute);
    const inputParam = 'not-found';
    // Act
    const actual = service.getParam(inputRoute, inputParam);
    // Assert
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
