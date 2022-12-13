import { humanize, TimeSpan, TimeSpanPipe } from './time-span.pipe';

fdescribe('The TimeSpan Pipe', () => {
  let pipe: TimeSpanPipe;
  let input: TimeSpan;
  beforeEach(() => {
    pipe = new TimeSpanPipe();
    input = {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 1),
    };
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return _0d 0h_ for same start-end dates', () => {
    const actual = pipe.transform(input);
    const expected = '0d 0h';
    expect(actual).toEqual(expected);
  });
  it('should call the calculateTimeSpan function correctly', () => {
    const spy = spyOn<any>(pipe, 'timeSpanCalculator');
    pipe.transform(input);
    expect(spy).toHaveBeenCalledWith(input);
  });
  it('should return the calculateTimeSpan result', () => {
    const spy = spyOn<any>(pipe, 'timeSpanCalculator');
    const output = ' 0D 0H ';
    spy.and.returnValue(output);
    const actual = pipe.transform(input);
    const expected = '0d 0h';
    expect(actual).toEqual(expected);
  });
});

fdescribe('The humanize function', () => {
  let input: TimeSpan;
  beforeEach(() => {
    input = {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 1),
    };
  });
  it('should return _ 0D 0H _ for same start-end dates', () => {
    const actual = humanize(input);
    const expected = ' 0D 0H ';
    expect(actual).toEqual(expected);
  });
  it('should return _1d 0h_ for 1 day difference', () => {
    input.end = new Date(2020, 1, 2);
    const actual = humanize(input);
    const expected = ' 1D 0H ';
    expect(actual).toEqual(expected);
  });
  it('should return _0d 1h_ for 1 hour difference', () => {
    input.end = new Date(2020, 1, 1, 1);
    const actual = humanize(input);
    const expected = ' 0D 1H ';
    expect(actual).toEqual(expected);
  });
});
