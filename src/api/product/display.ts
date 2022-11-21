import { AxiosResponse } from 'axios';

import request from 'api/core';
import { BrandsParams } from 'models/product';

const display = {
    getDisplayBrands: ({
        filter,
        pageNumber,
        pageSize,
        hasTotalCount = false,
        fromDB = false,
        sort,
    }: BrandsParams): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/brands',
            params: {
                'filter.name': filter?.name,
                'filter.categoryNo': filter?.categoryNo,
                pageNumber,
                pageSize,
                hasTotalCount,
                fromDB,
                'sort.criterion': sort?.criterion,
                'sort.direction': sort?.direction,
            },
        }),

    // TODO brandNo 400 error 발생 추후 테스트 필요
    getDisplayBrandDetail: (brandNo: String): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/brands/${brandNo}`,
        }),
};

export default display;
