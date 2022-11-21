import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { getProductSectionResponse, ProductSection } from 'models/display';

const productSection = {
    getProductSections: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/sections',
            headers: Object.assign({}, defaultHeaders()),
        }),
    /**
     * 상품 섹션 조회하기 (단일섹션-페이징) v1.1
     *
     * - 상품 섹션 번호로 상품 섹션 조회하는 API입니다
     * - 버전 v1.1 API입니다.
     */
    getProductSection: (
        sectionNo: string,
        params: Partial<ProductSection> & Paging,
    ): Promise<AxiosResponse<getProductSectionResponse>> =>
        request({
            method: 'GET',
            url: `display/sections/${sectionNo}`,
            params: {
                by: params.by,
                soldout: params.soldout,
                saleStatus: params.saleStatus,
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                hasTotalCount: params.hasTotalCount,
                hasOptionValues: params.hasOptionValues,
            },
            headers: Object.assign({}, defaultHeaders(), { version: '1.1' }),
        }),
    getDisplaySection: (
        sectionId: string,
        {
            by,
            soldout,
            saleStatus,
            pageNumber,
            pageSize,
            hasTotalCount,
            hasOptionValues,
        }: Omit<ProductSection, 'sectionNo' | 'direction'> & Paging,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/display/sections/ids/${sectionId}`,
            params: {
                by,
                soldout,
                saleStatus,
                pageNumber,
                pageSize,
                hasTotalCount,
                hasOptionValues,
            },
            headers: Object.assign({}, defaultHeaders()),
        }),
};

export default productSection;
