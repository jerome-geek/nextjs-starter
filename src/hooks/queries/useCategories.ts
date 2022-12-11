import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { category } from 'api/display';
import { Category } from 'models/display';

interface useCategoriesParams<T = Category> {
    options?: UseQueryOptions<AxiosResponse<T>, AxiosError, T, [string]>;
}

const useCategories = ({ options }: useCategoriesParams = {}) => {
    return useQuery(
        ['category_list'],
        async () => await category.getCategories(),
        {
            select: ({ data }) => data,
            ...options,
        },
    );
};

export default useCategories;
