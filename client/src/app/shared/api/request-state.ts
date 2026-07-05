export type RequestState<T> =
  | { status: 'loading' }
  | { status: 'default'; data: T }
  | { status: 'error'; message: string };
