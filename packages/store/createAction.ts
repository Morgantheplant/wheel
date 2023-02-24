import { ActionType } from "../../src/store/slice";

export interface Action<T, P> {
    readonly type: T;
    readonly payload: P;
}

export const createAction =<T extends ActionType, P>(type: T) => (payload: P): Action<T, P> =>  ({
    type,
    payload
}) 