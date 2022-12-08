import { myOrder } from 'api/order';
import useMember from 'hooks/useMember';
import { ORDER_REQUEST_TYPE } from 'models';
import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { OrderDetailResponse } from 'models/order';

interface useOrderDetailParams {
    orderNo: string;
    params?: { orderRequestTypes: ORDER_REQUEST_TYPE };
    options?: UseQueryOptions<
        AxiosResponse<OrderDetailResponse>,
        AxiosError,
        OrderDetailResponse,
        [string, { orderNo: string; memberNo: number | undefined }]
    >;
}

const useOrderDetail = ({
    orderNo,
    params = { orderRequestTypes: ORDER_REQUEST_TYPE.ALL },
    options,
}: useOrderDetailParams) => {
    const { member } = useMember();

    return useQuery(
        ['orderDetail', { orderNo, memberNo: member?.memberNo }],
        async () => await myOrder.getOrderDetail(orderNo, { ...params }),
        {
            enabled: !!orderNo && !!member,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useOrderDetail;
