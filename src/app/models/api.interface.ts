export interface Api<T> {
  isWorking: boolean;
  error: string;
  data: T[];
}

export const API_INITIAL_STATE: Api<any> = {
  isWorking: false,
  error: '',
  data: [],
};
