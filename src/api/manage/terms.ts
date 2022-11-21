import { AxiosResponse } from 'axios';

import request from 'api/core';
import { SHOPBY_TERMS_TYPES } from 'models';

const terms = {
    /**
     * 적용 중인 몰 약관 조회하기
     * - 해당 쇼핑몰의 약관을 조회하는 API 입니다.
     *
     * @param params
     * @returns
     */
    getTerms: (params: {
        termsTypes: SHOPBY_TERMS_TYPES;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/terms',
            params: { termsTypes: params.termsTypes },
        }),

    getTermHistory: ({
        termsTypes,
        futureDaysToShow,
    }: {
        termsTypes: SHOPBY_TERMS_TYPES;
        futureDaysToShow?: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/terms/history',
            params: { termsTypes, futureDaysToShow },
        }),

    getTermDetail: (termsNo: number): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/terms/${termsNo}`,
        }),
};

export default terms;
