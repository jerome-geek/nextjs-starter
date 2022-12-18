import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import { guestOrder } from 'api/order';
import { tokenStorage } from 'utils/storage';
import { OrderDetailResponse } from 'models/order';

interface useGuestOrderDetailParams {
    guestOrderNo: string;
    options?: UseQueryOptions<
        AxiosResponse<OrderDetailResponse>,
        AxiosError<ShopByErrorResponse>,
        OrderDetailResponse,
        [string, { guestToken: string }]
    >;
}

const useGuestOrderDetail = ({
    guestOrderNo,
    options,
}: useGuestOrderDetailParams) => {
    const guestToken = tokenStorage.getGuestToken()?.accessToken ?? '';

    return useQuery(
        ['guestOrderDetail', { guestToken }],
        async () => await guestOrder.getOrderDetail(guestToken, guestOrderNo),
        {
            enabled: !!guestToken && !!guestOrderNo,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useGuestOrderDetail;
