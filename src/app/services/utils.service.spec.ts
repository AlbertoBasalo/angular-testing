import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from './utils.service';

// ! session 3
// ! a basic unit test... but extra concise... when suitable

describe('The Utils Service _without TestBed_', () => {
  let utilsService: UtilsService;

  beforeEach(() => {
    utilsService = new UtilsService();
  });

  it('should be created', () => {
    expect(utilsService).toBeTruthy();
  });

  it('should return a hyphened string', () => {
    expect(utilsService.getHyphened('The Moon')).toEqual('the-moon');
  });

  it('should return a hyphened string for complex inputs', () => {
    const input = 'The #1 email address of The Moon is: moon@earth.sun';
    const actual = utilsService.getHyphened(input);
    const expected = 'the-1-email-address-of-the-moon-is-moon-earth-sun';
    expect(actual).toEqual(expected);
  });
});

// ! session 3
// ! using the angular TestBed
// ! to test the getParam method
// ! who needs an activated route as a parameter

fdescribe('The Utils Service _with TestBed_', () => {
  let utilsService: UtilsService;
  let activatedRoute: ActivatedRoute;
  const aNotFoundParam = 'badParam';
  beforeEach(() => {
    // * activated route double to be injected instead of the real one
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (paramId: string) => {
            // * simulates a not found key returning null
            if (paramId === aNotFoundParam) return null;
            // * otherwise returns the received param as the value
            return 'fake value of ' + paramId;
          },
        },
      },
    };
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: ActivatedRoute, // * what it asks for
          useValue: activatedRouteMock, // * what it gets
        },
      ],
    });
    utilsService = TestBed.inject(UtilsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(utilsService).toBeTruthy();
  });

  it('should get the value of the default param from the ActivatedRoute', () => {
    expect(utilsService.getParam(activatedRoute)).toEqual('fake value of id');
  });

  it('should get the value of the specified param from the ActivatedRoute', () => {
    expect(utilsService.getParam(activatedRoute, 'tripId')).toEqual(
      'fake value of tripId'
    );
  });

  it('should get an empty string for a not found param', () => {
    expect(utilsService.getParam(activatedRoute, 'badParam')).toEqual('');
  });
});
