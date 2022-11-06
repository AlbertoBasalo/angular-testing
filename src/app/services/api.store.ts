import { Api, API_INITIAL_STATE } from '@models/api.interface';
import { BaseStore } from './base.store';

export class ApiStore<T> {
  private baseStore = new BaseStore<Api<T>>(API_INITIAL_STATE);

  constructor() {
    console.warn('apiStore', typeof this);
  }

  setIsWorking(isWorking = true) {
    this.baseStore.setState({ ...API_INITIAL_STATE, isWorking });
  }
  setData(data: T[]) {
    this.baseStore.setState({ ...API_INITIAL_STATE, data });
  }
  setError(error: string) {
    this.baseStore.setState({ ...API_INITIAL_STATE, error });
  }
  selectState$() {
    return this.baseStore.select$((state) => state);
  }
  selectSuccess$() {
    return this.baseStore.select$(
      (state) =>
        state.isWorking === false &&
        state.error === null &&
        state.data.length > 0
    );
  }
}
