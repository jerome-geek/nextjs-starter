import { AnyAction, CombinedState, combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { HYDRATE } from 'next-redux-wrapper';

import { makeStore } from 'state/store';
import memberSlice, { MemberInitialState } from 'state/slices/memberSlice';
import cartSlice, { CartInitialState } from 'state/slices/cartSlice';

export interface InitialRootState {
    member: MemberInitialState;
    cart: CartInitialState;
}

const rootReducer = (
    state: InitialRootState,
    action: AnyAction,
): CombinedState<InitialRootState> => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        default: {
            const combinedReducer = combineReducers({
                member: memberSlice.reducer,
                cart: cartSlice.reducer,
            });
            return combinedReducer(state, action);
        }
    }
};

export default rootReducer;
