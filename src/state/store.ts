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

// useSelector hook 대신 사용. useSelector 함수의 파라미터에 타입을 지정하지 않아도 된다.
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// wrapper 로 감싸기
const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});

export default wrapper;
