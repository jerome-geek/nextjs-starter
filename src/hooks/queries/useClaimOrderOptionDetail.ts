import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { CLAIM_TYPE } from 'models';
import { GetOrderOptionDetailForClaimResponse } from 'models/claim';
import { memberClaim } from 'api/claim';

interface useClaimOrderOptionDetailParams {
    orderOptionNo: string;
    params: {
        claimType: CLAIM_TYPE;
    };
    options?: UseQueryOptions<
        AxiosResponse<GetOrderOptionDetailForClaimResponse>,
        AxiosError<ShopByErrorResponse>,
        GetOrderOptionDetailForClaimResponse,
        [string, { orderOptionNo: string; claimType: CLAIM_TYPE }]
    >;
}

const useClaimOrderOptionDetail = ({
    orderOptionNo,
    params,
    options,
}: useClaimOrderOptionDetailParams) => {
    return useQuery(
        [
            'claim_orderOptionDetail',
            { orderOptionNo, claimType: params.claimType },
        ],
        async () =>
            await memberClaim.getOrderOptionDetailForClaim(
                orderOptionNo,
                params,
            ),
        {
            enabled: !!params && params.claimType !== CLAIM_TYPE.NONE,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useClaimOrderOptionDetail;
