import { ApiService } from '@services/api.service';
import { OptionsService } from './options.service';

// ! session 2
// ! A unit test with double instead of collaborator

describe('The Options service with ApiService collaborator doubled', () => {
  const inputEndPoint = 'agency-ranges';
  const inputPayload = { id: 'asteroid', label: 'Asteroid', value: 'asteroid' };
  it('should call the apiService getOptions$ method when getting data', () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', [
      'getOptions$',
    ]);
    const optionsService = new OptionsService(apiServiceSpy);
    optionsService.getOptionsForEndPoint$(inputEndPoint);
    expect(apiServiceSpy.getOptions$).toHaveBeenCalled();
  });
  it('should call the apiService getOptions$ method only once with the correct endpoint', () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', [
      'getOptions$',
    ]);
    const optionsService = new OptionsService(apiServiceSpy);
    optionsService.getOptionsForEndPoint$(inputEndPoint);
    expect(apiServiceSpy.getOptions$).toHaveBeenCalledTimes(1);
    expect(apiServiceSpy.getOptions$).toHaveBeenCalledWith(inputEndPoint);
  });
  it('should call the api post with the correct endpoint and payload', () => {
    const apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', [
      'postOption$',
    ]);
    const optionsService = new OptionsService(apiServiceSpy);
    optionsService.saveOption$(inputEndPoint, inputPayload);
    const postOptions$Spy = apiServiceSpy.postOption$;
    const expectedEndPoint = 'agency-ranges';
    const expectedPayload = {
      id: 'asteroid',
      label: 'Asteroid',
      value: 'asteroid',
    };
    expect(postOptions$Spy).toHaveBeenCalledWith(
      expectedEndPoint,
      expectedPayload
    );
  });
  it('should call the api delete with the correct endpoint and id', () => {
    // ToDo: student exercise
    const apiServiceSpy = jasmine.createSpyObj<ApiService>('ApiService', [
      'deleteOption$',
    ]);
    const optionsService = new OptionsService(apiServiceSpy);
    optionsService.deleteOption$(inputEndPoint, inputPayload);
    const deleteOptions$Spy = apiServiceSpy.deleteOption$;
    const expectedEndPoint = 'agency-ranges';
    const expectedPayload = 'asteroid';
    expect(deleteOptions$Spy).toHaveBeenCalledWith(
      expectedEndPoint,
      expectedPayload
    );
  });
  it('should call throw an exception when no id', () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['deleteOption$']);
    const optionsService = new OptionsService(apiServiceSpy);
    const inputEndPoint = 'agency-ranges';
    const inputPayload = { label: 'Asteroid', value: 'asteroid' };
    // * assert that an act throws an exception
    expect(() =>
      optionsService.deleteOption$(inputEndPoint, inputPayload)
    ).toThrow();
  });
});
