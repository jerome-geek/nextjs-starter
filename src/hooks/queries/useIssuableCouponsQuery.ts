import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { coupon } from 'api/promotion';
import { useMember } from 'hooks';
import { IssuableCouponResponse } from 'models/promotion';

const useIssuableCouponsQuery = () => {
    const { member } = useMember();

    const isLogin = useMemo(() => !!member, [member]);

    return useQuery<
        AxiosResponse<IssuableCouponResponse[]>,
        AxiosError,
        IssuableCouponResponse[]
    >(
        ['issuableCoupons', member?.memberNo],
        async () => await coupon.getIssuableCoupons(),
        {
            enabled: isLogin,
            select: ({ data }) => data,
        },
    );
};

export default useIssuableCouponsQuery;
