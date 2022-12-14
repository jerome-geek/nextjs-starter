import { AnyAction, CombinedState, Reducer } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createWrapper } from 'next-redux-wrapper';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import rootReducer, { InitialRootState } from 'state/reducers';

const makeConfiguredStore = (reducer: any) =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                // serializableCheck: {
                //     ignoredActions: [
                //         FLUSH,
                //         REHYDRATE,
                //         PAUSE,
                //         PERSIST,
                //         PURGE,
                //         REGISTER,
                //     ],
                // },
                serializableCheck: false,
            }).concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    });

export const makeStore = () => {
    const isServer = typeof window === 'undefined';

    if (isServer) {
        return makeConfiguredStore(rootReducer);
    } else {
        const storage = require('redux-persist/lib/storage').default;

        const persistConfig = {
            key: 'root',
            storage,
            timeout: 1000,
        };

        const persistedReducer = persistReducer(
            persistConfig,
            rootReducer as Reducer<CombinedState<InitialRootState>, AnyAction>,
        );

        // we need it only on client side
        const store = makeConfiguredStore(persistedReducer);
        let persistor = persistStore(store);

        return {
            persistor,
            ...store,
            // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
            __persistor: persistStore(store),
        };
    }
};

export type RootState = ReturnType<typeof rootReducer>;

const store = makeStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

// useSelector hook ?????? ??????. useSelector ????????? ??????????????? ????????? ???????????? ????????? ??????.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// wrapper ??? ?????????
const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
