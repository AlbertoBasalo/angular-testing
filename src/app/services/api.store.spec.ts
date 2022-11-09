import { ApiStore } from './api.store';

describe('ApiStore', () => {
  it('should create an instance', () => {
    expect(new ApiStore()).toBeTruthy();
  });
  it('should set initial state', () => {
    const initialState = {
      isWorking: false,
      error: '',
      data: [],
    };
    const store = new ApiStore();
    store.selectState$().subscribe((actual) => {
      const expected = initialState;
      expect(actual).toEqual(expected);
    });
  });
  it('should set is working', () => {
    const store = new ApiStore();
    store.setIsWorking();
    store.selectState$().subscribe((actual) => {
      const expected = true;
      expect(actual.isWorking).toEqual(expected);
    });
  });
  it('should set data', () => {
    const store = new ApiStore();
    const data = [{ id: 1 }, { id: 2 }];
    store.setData(data);
    store.selectState$().subscribe((actual) => {
      const expected = data;
      expect(actual.data).toEqual(expected);
    });
  });
  it('should add item', () => {
    const store = new ApiStore();
    const data = [{ destination: 'The Moon' }, { destination: 'Mars' }];
    store.setData(data);
    const newItem = { destination: 'Earth orbit' };
    store.addItem(newItem);
    store.selectState$().subscribe((actual) => {
      const expected = [
        { destination: 'The Moon' },
        { destination: 'Mars' },
        { destination: 'Earth orbit' },
      ];
      expect(actual.data).toEqual(expected);
    });
  });
});
