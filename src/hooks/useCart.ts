import { useLayoutEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import { useQuery } from 'react-query';
import { flatMap, pipe, pluck, size } from '@fxts/core';

import { useTypedSelector } from 'state/reducers';
import { reset } from 'state/slices/memberSlice';
import { cart, guestOrder } from 'api/order';
import { CartList } from 'models/order';
import { isLogin } from 'utils/users';

const useCart = () => {
    const [cartInfo, setCartInfo] = useState<CartList>();
    const [totalCount, setTotalCount] = useState(0);

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { cart: guestCartList } = useTypedSelector(
        ({ cart }) => ({
            cart: cart.data,
        }),
        shallowEqual,
    );

    const { refetch: guestCartRefetch } = useQuery(
        ['guestCart', guestCartList],
        async () =>
            await guestOrder.getCart(guestCartList, {
                divideInvalidProducts: true,
            }),
        {
            enabled: !isLogin(),
            keepPreviousData: true,
            select: (response) => response.data,
            onSuccess: (data) => setCartInfo(data),
        },
    );

    const { refetch: cartRefetch } = useQuery(
        ['cart', member?.memberId],
        async () => await cart.getCart(),
        {
            enabled: isLogin(),
            keepPreviousData: true,
            select: (response) => response.data,
            onSuccess: (data) => setCartInfo(data),
            onError: (error) => {
                reset();
            },
        },
    );

    useLayoutEffect(() => {
        if (cartInfo) {
            setTotalCount(
                pipe(
                    cartInfo.deliveryGroups,
                    pluck('orderProducts'),
                    flatMap((a) => a),
                    flatMap((b) => b.orderProductOptions),
                    size,
                ),
            );
        }
    }, [cartInfo]);

    return {
        cartInfo,
        totalCount,
        refetch: isLogin() ? cartRefetch : guestCartRefetch,
    };
};

export default useCart;
