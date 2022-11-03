export interface Guard {
  isDirty?: boolean;
  canDeactivate(): boolean;
}
