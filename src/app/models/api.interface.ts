export interface Api<T> {
  isWorking: boolean;
  error: string;
  data: T;
}
