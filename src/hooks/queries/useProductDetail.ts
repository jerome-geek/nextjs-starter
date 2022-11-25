import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { product } from 'api/product';
import { ProductDetailResponse } from 'models/product';
import { CHANNEL_TYPE } from 'models';

interface useProductDetailParams<T = ProductDetailResponse> {
    productNo: string;
    params?: { channelType: CHANNEL_TYPE };
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, { productNo: string }]
    >;
}

const useProductDetail = ({
    productNo,
    params,
    options,
}: useProductDetailParams) => {
    return useQuery(
        ['product_detail', { productNo }],
        async () => await product.getProductDetail(productNo, params ?? params),
        {
            enabled: !!productNo,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useProductDetail;
