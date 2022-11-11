import { OptionsService } from './options.service';

describe('The options service', () => {
  it('should call the api correct method', () => {
    // Arrange
    const double = jasmine.createSpyObj('ApiService', ['getOptions$']);
    const sut = new OptionsService(double);
    const input = 'agency-ranges';
    // Act
    sut.getOptionsForEndPoint$(input);
    // Assert
    const actual = double.getOptions$;
    expect(actual).toHaveBeenCalled();
  });
  it('should call the api get with the correct endpoint', () => {
    // Arrange
    const double = jasmine.createSpyObj('ApiService', ['getOptions$']);
    const sut = new OptionsService(double);
    const input = 'agency-ranges';
    // Act
    sut.getOptionsForEndPoint$(input);
    // Assert
    const actual = double.getOptions$;
    const expected = 'agency-ranges';
    expect(actual).toHaveBeenCalledWith(expected);
  });
  it('should call once the api get with the correct endpoint', () => {
    // Arrange
    const apiService = jasmine.createSpyObj('ApiService', ['getOptions$']);
    const optionsService = new OptionsService(apiService);
    const endPoint = 'agency-ranges';
    // Act
    optionsService.getOptionsForEndPoint$(endPoint);
    // Assert
    const actual = apiService.getOptions$;
    expect(actual).toHaveBeenCalledTimes(1);
  });
  it('should call the api post with the correct endpoint and payload', () => {
    // Arrange
    const double = jasmine.createSpyObj('ApiService', ['postOption$']);
    const sut = new OptionsService(double);
    const inputEndPoint = 'agency-ranges';
    const inputPayload = { id: '1', label: 'Asteroid', value: 'asteroid' };
    // Act
    sut.saveOption$(inputEndPoint, inputPayload);
    // Assert
    const actual = double.postOption$;
    const expectedEndPoint = 'agency-ranges';
    const expectedPayload = { id: '1', label: 'Asteroid', value: 'asteroid' };
    expect(actual).toHaveBeenCalledWith(expectedEndPoint, expectedPayload);
  });

  // DRY [seco] don`t repeat yourself
  // DAMP [húmedo] descriptive and meaningful phrases
  // WET [mojado] write everything twice

  it('should call the api delete with the correct endpoint and id', () => {
    // Arrange
    const double = jasmine.createSpyObj('ApiService', ['deleteOption$']);
    const sut = new OptionsService(double);
    const inputEndPoint = 'agency-ranges';
    const inputPayload = { id: '1', label: 'Asteroid', value: 'asteroid' };
    // Act
    sut.deleteOption$(inputEndPoint, inputPayload);
    // Assert
    const actual = double.deleteOption$;
    const expectedEndPoint = 'agency-ranges';
    const expectedPayload = '1';
    expect(actual).toHaveBeenCalledWith(expectedEndPoint, expectedPayload);
  });
  it('should call the api delete with the correct endpoint and blanc whe no id', () => {
    // Arrange
    const double = jasmine.createSpyObj('ApiService', ['deleteOption$']);
    const sut = new OptionsService(double);
    const inputEndPoint = 'agency-ranges';
    const inputPayload = { label: 'Asteroid', value: 'asteroid' };
    // Act & Assert
    expect(() => sut.deleteOption$(inputEndPoint, inputPayload)).toThrow();
  });
});
