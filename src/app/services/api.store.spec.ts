import { ApiStore } from './api.store';

describe('ApiStore', () => {
  it('should create an instance', () => {
    expect(new ApiStore()).toBeTruthy();
  });
  it('should set initial state', () => {
    // Arrange
    const initialState = {
      isWorking: false,
      error: '',
      data: [],
    };
    // Act
    const store = new ApiStore();
    // Assert
    store.selectState$().subscribe((actual) => {
      const expected = initialState;
      expect(actual).toEqual(expected);
    });
  });
  it('should set is working', () => {
    // Arrange
    const store = new ApiStore();
    // Act
    store.setIsWorking();
    // Assert
    store.selectState$().subscribe((actual) => {
      const expected = true;
      expect(actual.isWorking).toEqual(expected);
    });
  });
  it('should set data', () => {
    // Arrange
    const store = new ApiStore();
    const data = [{ id: 1 }, { id: 2 }];
    // Act
    store.setData(data);
    // Assert
    store.selectState$().subscribe((actual) => {
      const expected = data;
      expect(actual.data).toEqual(expected);
    });
  });
  it('should add item', () => {
    // Arrange
    const store = new ApiStore();
    const data = [{ id: 1 }, { id: 2 }];
    store.setData(data);
    const newItem = { id: 3 };
    // Act
    store.addItem(newItem);
    // Assert
    store.selectState$().subscribe((actual) => {
      const expected = [...data, newItem];
      expect(actual.data).toEqual(expected);
    });
  });
});
