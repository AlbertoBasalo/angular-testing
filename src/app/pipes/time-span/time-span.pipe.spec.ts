import { TimeSpan, TimeSpanPipe } from './time-span.pipe';

describe('TimeSpanPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeSpanPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return 0 days = hours for same start-end', () => {
    // Arrange
    const pipe = new TimeSpanPipe();
    const input: TimeSpan = {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 1),
    };
    // Act
    const actual = pipe.transform(input);
    // ! is an integration test!
    // Assert
    const expected = '0d 0h ';
    expect(actual).toEqual(expected);
  });
  it('should call the calculateTimeSpan function correctly', () => {
    // Arrange
    const pipe = new TimeSpanPipe();
    const input: TimeSpan = {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
    };
    const spy = spyOn<any>(pipe, 'timeSpanCalculator');
    // Act
    pipe.transform(input);
    // Assert
    expect(spy).toHaveBeenCalledWith(input);
  });
  it('should return the calculateTimeSpan result', () => {
    // Arrange
    const pipe = new TimeSpanPipe();
    const input: TimeSpan = {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 1),
    };
    const spy = spyOn<any>(pipe, 'timeSpanCalculator');
    spy.and.returnValue('the result');
    // Act
    const actual = pipe.transform(input);
    // Assert
    const expected = 'the result';
    expect(actual).toEqual(expected);
  });
});
