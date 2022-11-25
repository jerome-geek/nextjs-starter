import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { product } from 'api/product';
import { ProductOptionResponse } from 'models/product';

interface useProductOptionListParams<T = ProductOptionResponse> {
    productNo: string;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, { productNo: string }]
    >;
}

const useProductOptionList = ({
    productNo,
    options,
}: useProductOptionListParams) => {
    return useQuery(
        ['productOptionList', { productNo }],
        async () => await product.getProductOption(productNo),
        {
            enabled: !!productNo,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useProductOptionList;
