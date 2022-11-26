import { useQuery, UseQueryOptions } from 'react-query';
import dayjs from 'dayjs';
import { AxiosError, AxiosResponse } from 'axios';

import { coupon } from 'api/promotion';
import { PROFILE_COUPONS } from 'const/queryKeys';
import { Coupon, CouponsParams } from 'models/promotion';
import { isLogin } from 'utils/users';

interface useCouponDataParams {
    memberNo?: number;
    params?: CouponsParams;
    options?: UseQueryOptions<
        AxiosResponse<ItemList<Coupon>>,
        AxiosError,
        ItemList<Coupon>,
        [string, number, CouponsParams]
    >;
}

const useCouponData = ({
    memberNo = 0,
    params = {
        startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
        pageNumber: 1,
        pageSize: 30,
        usable: true,
    },
    options,
}: useCouponDataParams) => {
    return useQuery(
        [PROFILE_COUPONS, memberNo, { ...params }],
        async () => await coupon.getUserCoupons({ ...params }),
        { enabled: isLogin(), select: ({ data }) => data, ...options },
    );
};

export default useCouponData;
