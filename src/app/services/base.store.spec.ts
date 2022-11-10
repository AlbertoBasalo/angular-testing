import { BaseStore } from './base.store';

describe('The BaseStore class', () => {
  it('should create an instance', () => {
    expect(new BaseStore(null)).toBeTruthy();
  });
  it('should return initial state after instantiation', () => {
    // Arrange
    type State = { destination: string; startDate: Date };
    const input: State = {
      destination: 'The Moon',
      startDate: new Date('2022-11-10'),
    };
    const sut = new BaseStore(input);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'The Moon',
      startDate: new Date('2022-11-10'),
    };
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(input);
  });
  it('should return the last state set', () => {
    // Arrange
    type State = { destination: string };
    const initialState: State = {
      destination: 'The Moon',
    };
    const sut = new BaseStore(initialState);
    const input: State = {
      destination: 'Mars',
    };
    // Act
    sut.setState(input);
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'Mars',
    };
    expect(actual).toEqual(expected);
  });
  it('should change state with partial mutations', () => {
    // Arrange
    type State = { destination: string; price: number };
    const initialState: State = {
      destination: 'The Moon',
      price: 100,
    };
    const sut = new BaseStore(initialState);
    const input: Partial<State> = {
      price: 200,
    };
    // Act
    sut.setState(input);
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'The Moon',
      price: 200,
    };
    expect(actual).toEqual(expected);
  });
  it('should select full state', () => {
    // Arrange
    type State = { destination: string };
    const input: State = {
      destination: 'The Moon',
    };
    const sut = new BaseStore(input);
    // Act
    sut
      .select$((state) => state)
      .subscribe((actual) => {
        // Assert
        const expected = {
          destination: 'The Moon',
        };
        expect(actual).toEqual(expected);
      });
  });
  it('should select partial state', () => {
    // Arrange
    type State = { destination: string };
    const input: State = {
      destination: 'The Moon',
    };
    const sut = new BaseStore(input);
    // Act
    sut
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        const expected = 'The Moon';
        expect(actual).toEqual(expected);
      });
  });
  it('should select partial state with multiple subscriptions', () => {
    // Arrange
    type State = { destination: string };
    const input: State = {
      destination: 'The Moon',
    };
    const sut = new BaseStore(input);
    // Act
    sut
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        const expected = 'The Moon';
        expect(actual).toEqual(expected);
      });
    sut
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        const expected = 'The Moon';
        expect(actual).toEqual(expected);
      });
  });
});
