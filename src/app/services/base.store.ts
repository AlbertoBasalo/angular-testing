import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export class BaseStore<T> {
  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }

  setState(mutation: Partial<T>) {
    const newState = { ...this.getState(), ...this.clone(mutation) };
    this.state$.next(newState);
  }
  select$<K>(selector: (state: T) => K): Observable<K> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  public getState(): T {
    return this.clone(this.state$.getValue());
  }
  private getState$(): Observable<T> {
    return this.state$.asObservable().pipe(map(this.clone));
  }
  private clone<K>(target: K): K {
    return Object.assign({}, target);
  }
}
