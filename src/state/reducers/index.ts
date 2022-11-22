import { AnyAction, CombinedState, combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { HYDRATE } from 'next-redux-wrapper';

import memberSlice, { MemberInitialState } from 'state/slices/memberSlice';
import { store } from 'state/store';

export interface InitialRootState {
    member: MemberInitialState;
}

const rootReducer = (
    state: InitialRootState,
    action: AnyAction,
): CombinedState<InitialRootState> => {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default: {
            const combinedReducer = combineReducers({
                member: memberSlice.reducer,
            });
            return combinedReducer(state, action);
        }
    }
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

// useSelector hook 대신 사용. useSelector 함수의 파라미터에 타입을 지정하지 않아도 된다.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
