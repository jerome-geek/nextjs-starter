import { useQuery, UseQueryOptions } from 'react-query';
import dayjs from 'dayjs';
import { AxiosError, AxiosResponse } from 'axios';

import { myOrder } from 'api/order';
import { isLogin } from 'utils/users';
import { OrderSummary } from 'models/order';

interface useOrderSummaryParams<T = OrderSummary> {
    memberNo?: number;
    params?: SearchDate;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, { memberNo: number } & SearchDate]
    >;
}

const useOrderSummary = ({
    memberNo = 0,
    params = {
        startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
    },
    options,
}: useOrderSummaryParams) => {
    return useQuery(
        ['orderSummary', { memberNo, ...params }],
        async () => await myOrder.getOrderOptionStatus(params),
        {
            enabled: memberNo !== 0 && isLogin(),
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useOrderSummary;
