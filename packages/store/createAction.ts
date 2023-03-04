export interface Action<T, P> {
    readonly type: T;
    readonly payload: P;
}

export const createAction =<T, P>(type: T) => (payload: P): Action<T, P> =>  ({
    type,
    payload
}) 