import { Api, API_INITIAL_STATE } from '@models/api.interface';
import { BaseStore } from './base.store';
/** Specialized Store to manage API calls state */
export class ApiStore<T> {
  private baseStore = new BaseStore<Api<T>>(API_INITIAL_STATE);

  constructor() {}

  /** Used for marking a call in a running state*/
  setIsWorking(isWorking = true) {
    this.baseStore.setState({ isWorking, error: '' });
  }
  /** Used for setting the data returned from an API call */
  setData(data: T[]) {
    this.baseStore.setState({ isWorking: false, data });
  }
  /** Used for adding an item to the data returned from an API call */
  addItem(item: T) {
    const currentState = this.baseStore.getState();
    const data = [...currentState.data, item];
    this.baseStore.setState({ isWorking: false, error: '', data });
  }
  /** Used for deleting an item from the data returned from an API call */
  deleteItem(item: T) {
    const currentState = this.baseStore.getState();
    const data = currentState.data.filter(
      (i) => (i as any)['id'] !== (item as any)['id']
    );
    this.baseStore.setState({ isWorking: false, error: '', data });
  }
  /** Used for setting an error message */
  setError(error: string) {
    this.baseStore.setState({ isWorking: false, error });
  }
  /** Used for getting the state observable changes */
  selectState$() {
    return this.baseStore.select$((state) => state);
  }
  /** Used for getting an observable of successfully api calls */
  selectSuccess$() {
    return this.baseStore.select$((state) => this.isSuccess(state));
  }
  /** Determines if a call is successful */
  private isSuccess(state: Api<T>): boolean {
    return (
      state.isWorking === false && state.error === '' && state.data.length > 0
    );
  }
}
