import { useQuery, UseQueryOptions } from 'react-query';
import dayjs from 'dayjs';
import { AxiosError, AxiosResponse } from 'axios';

import { accumulation } from 'api/manage';
import { GetAccumulationSummaryResponse } from 'models/manage';
import { isLogin } from 'utils/users';

interface useAccumulationDataParams<T = GetAccumulationSummaryResponse> {
    memberNo?: number;
    params?: SearchDate;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, { memberNo: number } & SearchDate]
    >;
}

const useAccumulationData = ({
    memberNo = 0,
    params = {
        startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD HH:mm:ss'),
        endYmd: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    },
    options,
}: useAccumulationDataParams) => {
    return useQuery(
        ['accumulation', { memberNo, ...params }],
        async () => await accumulation.getAccumulationSummary(params),
        {
            enabled: memberNo !== 0 && isLogin(),
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useAccumulationData;
