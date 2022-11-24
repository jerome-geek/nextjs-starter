import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { banner } from 'api/display';
import { GetBannersResponse } from 'models/display';

interface useBannersParams {
    banners: string[];
    options?: UseQueryOptions<
        AxiosResponse<GetBannersResponse[]>,
        AxiosError,
        GetBannersResponse[],
        [string, string[]]
    >;
}

const useBanners = ({ banners, options }: useBannersParams) => {
    return useQuery(
        ['banners', banners],
        async () => await banner.getBanners(banners),
        {
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useBanners;
