import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from './utils.service';

describe('The Utils Service _without TestBed_', () => {
  let sut: UtilsService;

  beforeEach(() => {
    sut = new UtilsService();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should return a hyphened string', () => {
    // Arrange
    const input = 'The Moon';
    // Act
    const actual = sut.getHyphened(input);
    // Arrange
    const expected = 'the-moon';
    expect(actual).toEqual(expected);
  });

  it('should return a hyphened string for complex inputs', () => {
    // Arrange
    const input = 'The #1 email address of The Moon is: moon@earth.sun';
    // Act
    const actual = sut.getHyphened(input);
    // Arrange
    const expected = 'the-1-email-address-of-the-moon-is-moon-earth-sun';
    expect(actual).toEqual(expected);
  });
});

describe('The Utils Service', () => {
  let sut: UtilsService;
  let inputActivatedRoute: ActivatedRoute;
  const inputNotFoundParam = 'notFound';
  beforeEach(() => {
    // ! activated route double to be injected instead of the real one
    // simulates a not found key returning null
    // otherwise returns the received param as the value
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (paramId: string) =>
            paramId === inputNotFoundParam ? null : paramId,
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
    sut = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should return a hyphened string', () => {
    // Arrange
    const input = 'The Moon';
    // Act
    const actual = sut.getHyphened(input);
    // Assert
    const expected = 'the-moon';
    expect(actual).toEqual(expected);
  });

  it('should return a hyphened string for complex inputs', () => {
    // Arrange
    const input = 'The #1 email address of The Moon is: moon@earth.sun';
    // Act
    const actual = sut.getHyphened(input);
    // Assert
    const expected = 'the-1-email-address-of-the-moon-is-moon-earth-sun';
    expect(actual).toEqual(expected);
  });

  // ! testing the getParam method needs an activated route to be injected

  it('should get the default param from the ActivatedRoute', () => {
    // Arrange
    inputActivatedRoute = TestBed.inject(ActivatedRoute);
    // Act
    const actual = sut.getParam(inputActivatedRoute);
    // Assert
    const expected = 'id';
    expect(actual).toEqual(expected);
  });

  it('should get the specified param from the ActivatedRoute', () => {
    // Arrange
    inputActivatedRoute = TestBed.inject(ActivatedRoute);
    const inputParam = 'tripId';
    // Act
    const actual = sut.getParam(inputActivatedRoute, inputParam);
    // Assert
    const expected = 'tripId';
    expect(actual).toEqual(expected);
  });

  it('should get empty string for not found params', () => {
    // Arrange
    inputActivatedRoute = TestBed.inject(ActivatedRoute);
    const inputParam = inputNotFoundParam;
    // Act
    const actual = sut.getParam(inputActivatedRoute, inputParam);
    // Assert
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
