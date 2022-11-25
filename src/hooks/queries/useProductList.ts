import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { product } from 'api/product';
import { ProductSearchParams, ProductsSearchResponse } from 'models/product';

interface useProductListParams<T = ProductsSearchResponse> {
    searchParams: ProductSearchParams;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, ProductSearchParams]
    >;
}

const useProductList = ({ searchParams, options }: useProductListParams) => {
    return useQuery(
        ['productList', searchParams],
        async () => await product.searchProducts(searchParams),
        {
            keepPreviousData: true,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useProductList;
