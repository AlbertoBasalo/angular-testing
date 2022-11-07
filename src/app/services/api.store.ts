import { Api, API_INITIAL_STATE } from '@models/api.interface';
import { BaseStore } from './base.store';

export class ApiStore<T> {
  private baseStore = new BaseStore<Api<T>>(API_INITIAL_STATE);

  constructor() {}

  setIsWorking(isWorking = true) {
    this.baseStore.setState({ isWorking, error: '' });
  }
  setData(data: T[]) {
    this.baseStore.setState({ isWorking: false, data });
  }
  addItem(item: T) {
    const currentState = this.baseStore.getState();
    const data = [...currentState.data, item];
    this.baseStore.setState({ isWorking: false, error: '', data });
  }
  deleteItem(item: T) {
    const currentState = this.baseStore.getState();
    const data = currentState.data.filter(
      (i) => (i as any)['id'] !== (item as any)['id']
    );
    this.baseStore.setState({ isWorking: false, error: '', data });
  }
  setError(error: string) {
    this.baseStore.setState({ isWorking: false, error });
  }
  selectState$() {
    return this.baseStore.select$((state) => state);
  }
  selectSuccess$() {
    return this.baseStore.select$((state) => this.isSuccess(state));
  }

  private isSuccess(state: Api<T>): boolean {
    return (
      state.isWorking === false && state.error === '' && state.data.length > 0
    );
  }
}
