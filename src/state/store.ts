import { AnyAction, CombinedState, Reducer } from 'redux';
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import rootReducer, { InitialRootState } from 'state/reducers';

export const store = configureStore({
    reducer: rootReducer as Reducer<
        CombinedState<InitialRootState>,
        AnyAction
    >,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
    devTools: process.env.REACT_APP_MODE !== 'production',
});

// export const makeStore = () => {
//     const store = configureStore({
//         reducer: rootReducer as Reducer<
//             CombinedState<InitialRootState>,
//             AnyAction
//         >,
//         middleware: (getDefaultMiddleware) =>
//             getDefaultMiddleware().concat(logger),
//         devTools: process.env.REACT_APP_MODE !== 'production',
//     });

//     return store;
// };

const wrapper = createWrapper(() => store, { debug: true });
export default wrapper;
