import { BaseStore } from './base.store';

describe('Store', () => {
  it('should create an instance', () => {
    const initialState = {};
    expect(new BaseStore(initialState)).toBeTruthy();
  });
});
