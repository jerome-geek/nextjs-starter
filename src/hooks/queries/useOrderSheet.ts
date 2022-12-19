import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { orderSheet } from 'api/order';
import { OrderSheetResponse } from 'models/order';

interface useOrderSheetParams<T = OrderSheetResponse> {
    orderSheetNo: string;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError<ShopByErrorResponse>,
        T,
        [string, { orderSheetNo: string }]
    >;
}

const useOrderSheet = ({ orderSheetNo, options }: useOrderSheetParams) => {
    return useQuery(
        ['orderSheetData', { orderSheetNo }],
        async () =>
            await orderSheet.getOrderSheet(orderSheetNo, {
                includeMemberAddress: false,
            }),
        {
            enabled: !!orderSheetNo,
            select: ({ data }) => data,
            onError: (error) => {
                alert(
                    error?.response?.data?.message ||
                        '주문서 생성에 실패하였습니다.',
                );
                return;
            },
            ...options,
        },
    );
};

export default useOrderSheet;
