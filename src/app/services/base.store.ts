import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

/**  A generic class that can be used to create a store for any type of data. */
export class BaseStore<T> {
  /** stores and publishes changes on state of type T. */
  private state$: BehaviorSubject<T>;

  /** Takes an initial state of type T and assigns it to the state$ store. */
  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }
  /** Takes a mutation of type Partial<T> and assigns it to the state$ property.  */
  setState(mutation: Partial<T>) {
    const newState = { ...this.getState(), ...this.clone(mutation) };
    this.state$.next(newState);
  }
  /** Takes a selector function and returns an Observable of type K for any change detected. */
  select$<K>(selector: (state: T) => K): Observable<K> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  /** Returns a clone of the current state$.  */
  public getState(): T {
    return this.clone(this.state$.getValue());
  }
  /** Returns an Observable of the state$ changes. */
  private getState$(): Observable<T> {
    return this.state$.asObservable().pipe(map(this.clone));
  }
  /** Takes a target of type K and returns a clone of it. */
  private clone<K>(target: K): K {
    return Object.assign({}, target);
  }
}
