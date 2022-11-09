import { BaseStore } from './base.store';

describe('Store', () => {
  it('should create an instance', () => {
    expect(new BaseStore(null)).toBeTruthy();
  });
});
