import { BaseStore } from './base.store';

describe('Store', () => {
  it('should create an instance', () => {
    const initialState = {};
    expect(new BaseStore(initialState)).toBeTruthy();
  });
  it('should set initial state', () => {
    // Arrange
    type State = { destination: string; startDate: Date };
    const initialState: State = {
      destination: 'Paris',
      startDate: new Date(),
    };
    // Act
    const store = new BaseStore(initialState);
    // Assert
    const actual = store.getState();
    const expected = initialState;
    expect(actual).toEqual(expected);
  });
  it('should set state', () => {
    // Arrange
    type State = { destination: string };
    const initialState: State = {
      destination: 'Paris',
    };
    const store = new BaseStore(initialState);
    const newState: State = {
      destination: 'London',
    };
    // Act
    store.setState(newState);
    // Assert
    const actual = store.getState();
    const expected = newState;
    expect(actual).toEqual(expected);
  });
  it('should set state with partial mutations', () => {
    // Arrange
    type State = { destination: string; price: number };
    const initialState: State = {
      destination: 'Paris',
      price: 100,
    };
    const store = new BaseStore(initialState);
    const newState: Partial<State> = {
      price: 200,
    };
    // Act
    store.setState(newState);
    // Assert
    const actual = store.getState();
    const expected = { ...initialState, ...newState };
    expect(actual).toEqual(expected);
  });
  it('should select full state', () => {
    // Arrange
    type State = { destination: string };
    const initialState: State = {
      destination: 'Paris',
    };
    const store = new BaseStore(initialState);
    // Act
    store
      .select$((state) => state)
      .subscribe((actual) => {
        // Assert
        const expected = initialState;
        expect(actual).toEqual(expected);
      });
  });
  it('should select partial state', () => {
    // Arrange
    type State = { destination: string };
    const initialState: State = {
      destination: 'Paris',
    };
    const store = new BaseStore(initialState);
    // Act
    store
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        const expected = 'Paris';
        expect(actual).toEqual(expected);
      });
  });
  it('should select partial state with multiple subscriptions', () => {
    // Arrange
    type State = { destination: string };
    const initialState: State = {
      destination: 'Paris',
    };
    const store = new BaseStore(initialState);
    // Act
    store
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        const expected = 'Paris';
        expect(actual).toEqual(expected);
      });
    store
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        const expected = 'Paris';
        expect(actual).toEqual(expected);
      });
  });
});
