import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { category } from 'api/display';
import { Brand, Category } from 'models/display';

interface useCategoryParams<T = Category & Brand[]> {
    categoryNo: string;
    options?: UseQueryOptions<
        AxiosResponse<T>,
        AxiosError,
        T,
        [string, { categoryNo: string }]
    >;
}

const useCategory = ({ categoryNo, options }: useCategoryParams) => {
    return useQuery(
        ['category_info', { categoryNo }],
        async () => await category.getCategory(categoryNo),
        {
            enabled: !!categoryNo,
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useCategory;
