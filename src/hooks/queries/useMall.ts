import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import mall from 'api/mall';
import { MallResponse } from 'models/mall';

interface useMallParams<T = MallResponse> {
    options?: UseQueryOptions<AxiosResponse<T>, AxiosError, T, [string]>;
}

const useMall = ({ options }: useMallParams = {}) => {
    return useQuery(['mallInfo'], async () => await mall.getMall(), {
        select: ({ data }) => data,
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useMall;
