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
import storage from 'redux-persist/lib/storage'; // default: localStorage

import rootReducer, { InitialRootState } from 'state/reducers';

const persistConfig = {
    key: 'root',
    storage,
    timeout: 500,
};

export const persistedReducer = persistReducer(
    persistConfig,
    rootReducer as Reducer<CombinedState<InitialRootState>, AnyAction>,
);

const makeConfiguredStore = (reducer: any) =>
    configureStore({
        reducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }).concat(logger),
        devTools: process.env.NODE_ENV !== 'production',
    });

export const makeStore = () => {
    const isServer = typeof window === 'undefined';

    if (isServer) {
        return makeConfiguredStore(rootReducer);
    } else {
        // we need it only on client side
        const store = makeConfiguredStore(persistedReducer);
        let persistor = persistStore(store);
        return { persistor, ...store };
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
