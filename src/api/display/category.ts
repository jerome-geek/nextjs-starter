import { AxiosResponse } from 'axios';

import request from 'api/core';
import { Brand, Category } from 'models/display';

const category = {
    /**
     * 전체 카테고리 조회하기
     * - 키워드로 카테고리를 조회하는 API입니다
     *   - 계층을 가지는 카테고리 목록(multiLevelCategories)을 조회합니다 (최대 5 depth)
     *   - 원본 카테고리 목록(flatCategories)을 조회합니다
     * - 원격 메모리 DB인 redis에 1일 캐시하여 사용하고 있습니다. (cached)
     *
     * @param params { keyword: string }
     * @returns Promise<AxiosResponse>
     */
    getCategories: (params?: {
        keyword: string;
    }): Promise<AxiosResponse<Category>> =>
        request({
            method: 'GET',
            url: '/categories',
            params: {
                keyword: params?.keyword,
            },
        }),

    /**
     * 신상품이 있는 카테고리 조회하기
     * - 판매 시작일이 1주일 이내인 상품이 존재하는 카테고리 조회하는 API입니다
     *
     * @returns Promise<AxiosResponse>
     */
    getNewProductCategories: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/categories/new-product-categories' }),

    /**
     * 1차 카테고리 간단 정보 조회하기
     * - 1차 카테고리 관련 간단한 정보를 조회하는 API 입니다
     * - 1일 캐시하여 사용하고 있습니다. (cached)
     *
     * @returns Promise<AxiosResponse>
     */
    get1depthCategory: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/categories/simple-1depth' }),

    /**
     * 카테고리 조회하기
     * - 카테고리 번호로 카테고리를 조회하는 API입니다
     *   - 계층을 가지는 카테고리 목록(multiLevelCategories)을 조회합니다 (최대 5 depth)
     *   - 원본 카테고리 목록(flatCategories)을 조회합니다
     *
     * @param categoryNo string
     * @returns Promise<AxiosResponse>
     */
    getCategory: (
        categoryNo: string,
    ): Promise<AxiosResponse<Category & Brand[]>> =>
        request({
            method: 'GET',
            url: `/categories/${categoryNo}`,
        }),
};

export default category;
