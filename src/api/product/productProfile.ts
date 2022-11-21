import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

interface RecentProductBody {
    mallProductNos: string;
    soldout: boolean;
    hasOptionValues: boolean;
    hasMaxCouponAmt: boolean;
}

const productProfile = {
    // TODO mallProductNos 모름
    getGuestRecentViewProducts: ({
        mallProductNos,
        soldout,
        hasOptionValues,
    }: Omit<RecentProductBody, 'hasMaxCouponAmt'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/guest/recent-products',
            params: {
                mallProductNos,
                soldout,
                hasOptionValues,
            },
        }),

    getLikeProducts: ({
        pageNumber,
        pageSize,
        hasTotalCount = false,
        hasMaxCouponAmt = false,
    }: Paging & { hasMaxCouponAmt?: boolean }) =>
        request({
            method: 'GET',
            url: '/profile/like-products',
            params: {
                pageNumber,
                pageSize,
                hasTotalCount,
                hasMaxCouponAmt,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO productNos 모름 400 error message: "좋아요 불가능한 상품입니다. [상품번호 : 10001]"
    updateProductsLike: ({
        productNos,
    }: {
        productNos: number[];
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/like-products',
            data: { productNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getRecentViewProducts: ({
        soldout,
        hasMaxCouponAmt,
        hasOptionValues,
    }: Omit<RecentProductBody, 'mallProductNos'>): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/recent-products',
            params: { soldout, hasMaxCouponAmt, hasOptionValues },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO description 에는 로그인 이후에만 호출 가능(accessToken)합니다. 라고 적혀있는데 parameter에는 적혀있지 않아서 나중에 확인이 필요함
    registerRecentViewProduct: ({
        productNo,
    }: {
        productNo: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/recent-products',
            data: { productNo },
        }),

    // TODO productNo 모름
    deleteRecentViewProducts: ({
        productNo,
    }: {
        productNo: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: '/profile/recent-products',
            data: { productNo },
        }),
};

export default productProfile;
