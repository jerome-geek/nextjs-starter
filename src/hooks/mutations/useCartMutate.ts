import { useMutation, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { AxiosError, AxiosResponse } from 'axios';

import { cart } from 'api/order';
import useMember from 'hooks/useMember';
import { ShoppingCartBody } from 'models/order';

const useCartMutate = () => {
    const queryClient = useQueryClient();
    const { t: productDetail } = useTranslation('productDetail');

    const { member } = useMember();

    return useMutation<
        AxiosResponse<{ count: number }>,
        AxiosError<ShopByErrorResponse>,
        Omit<ShoppingCartBody, 'cartNo'>[]
    >(
        async (cartList: Omit<ShoppingCartBody, 'cartNo'>[]) =>
            await cart.registerCart(cartList),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['cart', member?.memberId]);
                alert(productDetail('successCartAlert'));
            },
            onError: (error) => {
                alert(
                    error?.response?.data?.message ||
                        productDetail('failCartAlert'),
                );
            },
        },
    );
};

export default useCartMutate;
