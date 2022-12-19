import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { address } from 'api/manage';
import { AddressResponse } from 'models/manage';

interface useAddressParams<T = AddressResponse> {
    pageNumber: number;
    keyword: string;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, { pageNumber: number; keyword: string }]
    >;
}

const useAddress = ({ pageNumber, keyword, options }: useAddressParams) => {
    return useQuery(
        ['searchAddressData', { pageNumber, keyword }],
        async () =>
            await address.searchAddress({
                pageNumber,
                pageSize: 7,
                keyword,
            }),
        {
            enabled: !!keyword,
            keepPreviousData: true,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useAddress;
