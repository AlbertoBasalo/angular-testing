import { BaseStore } from './base.store';

// ! session 1

// ! Is a UNIT test for the BaseStore class
// ! External RxJs dependencies are not mocked
// ! Don`t mock what you don`t own

describe('The BaseStore class', () => {
  // * Definitions and setup
  type State = { destination: string; startDate: Date; price: number };
  const initialState: State = {
    destination: 'The Moon',
    startDate: new Date('2023-02-23'),
    price: 100,
  };

  it('should create an instance', () => {
    expect(new BaseStore(null)).toBeTruthy();
  });
  it('should instantiate with initial state ', () => {
    // Arrange
    const input = initialState;
    // Act
    const sut = new BaseStore(input);
    // Assert
    expect(sut).toBeTruthy();
  });
  it('should return initial state on instantiation', () => {
    // Arrange
    const sut = new BaseStore(initialState);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'The Moon',
      startDate: new Date('2023-02-23'),
      price: 100,
    };
    expect(actual).toEqual(expected);
  });
  it('should return a different instance with the same initial state', () => {
    // Arrange
    const sut = new BaseStore(initialState);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'The Moon',
      startDate: new Date('2023-02-23'),
      price: 100,
    };
    expect(actual).toEqual(expected);
    expect(actual).not.toBe(initialState);
  });
  it('should return the last state set', () => {
    // ToDo: student exercise
    // Arrange
    const sut = new BaseStore(initialState);
    const input: State = {
      destination: 'Mars',
      startDate: new Date('2024-02-24'),
      price: 200,
    };
    sut.setState(input);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'Mars',
      startDate: new Date('2024-02-24'),
      price: 200,
    };
    expect(actual).toEqual(expected);
  });
  it('should change state with partial mutations', () => {
    // ToDo: student exercise
    // Arrange
    const sut = new BaseStore(initialState);
    const input: Partial<State> = {
      price: 200,
    };
    sut.setState(input);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = {
      destination: 'The Moon',
      startDate: new Date('2023-02-23'),
      price: 200,
    };
    expect(actual).toEqual(expected);
  });
  it('should select full state', () => {
    // Arrange
    const sut = new BaseStore(initialState);
    const expected = {
      destination: 'The Moon',
      startDate: new Date('2023-02-23'),
      price: 100,
    };
    // Act
    sut
      .select$((state) => state)
      .subscribe((actual) => {
        // Assert
        expect(actual).toEqual(expected);
      });
  });
  it('should select partial state', () => {
    // ToDo: student exercise
    // Arrange
    const sut = new BaseStore(initialState);
    const expected = 'The Moon';
    // Act
    sut
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        expect(actual).toEqual(expected);
      });
  });
  it('should select same result for any subscriptor', () => {
    // Arrange
    const sut = new BaseStore(initialState);
    const expected = 'The Moon';
    // Act
    sut
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        expect(actual).toEqual(expected);
      });
    sut
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        expect(actual).toEqual(expected);
      });
  });
  it('should emit any state change', () => {
    // ToDo: student exercise
    // Arrange
    const sut = new BaseStore(initialState);
    const inputs = ['Mars', 'Venus'];
    const expected = ['The Moon', 'Mars', 'Venus'];
    let index = 0;
    // Act
    sut
      .select$((state) => state.destination)
      .subscribe((actual) => {
        // Assert
        expect(actual).toEqual(expected[index]);
        index++;
      });
    sut.setState({
      destination: inputs[0],
    });
    sut.setState({
      destination: inputs[1],
    });
  });

  // ! session 2
  // ! Spy on a private method

  it('should call clone when getState is called', () => {
    // Arrange
    const sut = new BaseStore(initialState);
    const cloneMethodSpy = spyOn(sut as any, 'clone');
    // Act
    sut.getState();
    // Assert
    expect(cloneMethodSpy).toHaveBeenCalled();
  });
});
