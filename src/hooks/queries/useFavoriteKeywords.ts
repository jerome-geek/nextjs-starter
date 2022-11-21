import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import { product } from 'api/product';

interface useFavoriteKeywordsParams {
    size?: number;
    options?: UseQueryOptions<
        AxiosResponse<string[]>,
        AxiosError,
        string[],
        [string]
    >;
}

const useFavoriteKeywords = ({
    size = 10,
    options = {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 5,
    },
}: useFavoriteKeywordsParams) => {
    return useQuery(
        ['favoriteKeywords'],
        async () => await product.getFavoriteKeywords({ size }),
        { select: ({ data }) => data, ...options },
    );
};

export default useFavoriteKeywords;
