import { OptionsService } from './options.service';

// describe('OptionsService', () => {
//   let service: OptionsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(OptionsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

describe('The OptionsService Unit', () => {
  it('should call the api get with the correct endpoint', () => {
    const api = jasmine.createSpyObj('ApiService', ['getOptions$']);
    const service = new OptionsService(api);
    service.getOptionsForEndPoint$('test');
    expect(api.getOptions$).toHaveBeenCalledWith('test');
  });
  it('should call the api post with the correct endpoint and option', () => {
    const api = jasmine.createSpyObj('ApiService', ['postOption$']);
    const service = new OptionsService(api);
    const option = { id: '1', label: 'inputLabel', value: 'inputValue' };
    service.saveOption$('test', option);
    expect(api.postOption$).toHaveBeenCalledWith('test', option);
  });
  it('should call the api delete with the correct endpoint and option', () => {
    const api = jasmine.createSpyObj('ApiService', ['deleteOption$']);
    const service = new OptionsService(api);
    const option = { id: '1', label: 'inputLabel', value: 'inputValue' };
    service.deleteOption$('test', option);
    expect(api.deleteOption$).toHaveBeenCalledWith('test', '1');
  });
  it('should call the api delete with a blanc id when id is not present', () => {
    const api = jasmine.createSpyObj('ApiService', ['deleteOption$']);
    const service = new OptionsService(api);
    const option = { label: 'inputLabel', value: 'inputValue' };
    service.deleteOption$('test', option);
    expect(api.deleteOption$).toHaveBeenCalledWith('test', '');
  });
});
