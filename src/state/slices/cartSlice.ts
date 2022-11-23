import { filter, findIndex, includes, map, pipe, toArray } from '@fxts/core';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShoppingCartBody } from 'models/order';

export interface CartBody extends ShoppingCartBody {
    isChecked?: boolean;
}

export interface CartInitialState extends InitialState<CartBody[]> {}

const cartInitialState: CartInitialState = {
    loading: false,
    data: [],
    error: {},
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartBody[]>) => {
            if (state.data.length > 0) {
                const combinedArray = [...action.payload, ...state.data];

                const cartList: CartBody[] = combinedArray.reduce(
                    (accumulatedCartList: CartBody[], currentCartData) => {
                        const overlapIndex = findIndex(
                            (a) => a.optionNo === currentCartData.optionNo,
                            accumulatedCartList,
                        );

                        if (overlapIndex === -1) {
                            accumulatedCartList.push(currentCartData);
                        } else {
                            accumulatedCartList[overlapIndex].orderCnt +=
                                currentCartData.orderCnt;
                        }
                        return accumulatedCartList;
                    },
                    [],
                );

                return {
                    ...state,
                    data: cartList,
                };
            }
            return {
                ...state,
                data: [...action.payload, ...state.data],
            };
        },
        updateCart: (state, action) => {
            return {
                ...state,
                data: pipe(
                    state.data,
                    map((a) =>
                        a.optionNo === action.payload.optionNo
                            ? {
                                  ...a,
                                  orderCnt: action.payload.orderCnt,
                              }
                            : a,
                    ),
                    toArray,
                ),
            };
        },
        checkCart: (state, action) => {
            return {
                ...state,
                data: pipe(
                    state.data,
                    map((a) =>
                        a.optionNo === action.payload.optionNo
                            ? { ...a, isChecked: !a.isChecked }
                            : a,
                    ),
                    toArray,
                ),
            };
        },
        checkAllCart: (state, action) => {
            return {
                ...state,
                data: pipe(
                    state.data,
                    map((a) => ({ ...a, isChecked: action.payload.checked })),
                    toArray,
                ),
            };
        },
        deleteCart: (state, action) => {
            return {
                ...state,
                data: pipe(
                    state.data,
                    filter(
                        (a) => !includes(a.optionNo, action.payload.deleteList),
                    ),
                    toArray,
                ),
            };
        },
    },
});

export const { setCart, updateCart, checkCart, checkAllCart, deleteCart } =
    cartSlice.actions;

export default cartSlice;
