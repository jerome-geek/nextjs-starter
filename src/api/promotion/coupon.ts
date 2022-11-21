import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import {
    CouponsParams,
    getCouponResponse,
    IssuableCouponResponse,
    TargetParams,
} from 'models/promotion';
import { tokenStorage } from 'utils/storage';

const coupon = {
    /**
     * 내 쿠폰 가져오기
     * - 로그인한 사용자가 보유한 쿠폰중 사용가능한 쿠폰과 이미 사용한 쿠폰을 구분하여 조회합니다.
     *
     * @param param0
     * @returns
     */
    getUserCoupons: (
        params?: CouponsParams,
    ): Promise<AxiosResponse<getCouponResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/coupons',
            params: {
                pageNumber: params?.pageNumber || 1,
                pageSize: params?.pageSize || 10,
                usable: params?.usable || true,
                startYmd: params?.startYmd,
                endYmd: params?.endYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     *  발급 가능한 쿠폰 조회하기
     * - 상품과 상관없이 오늘 날짜 기준으로 다운로드 가능한 쿠폰을 모두 조회합니다.
     *
     * @returns
     */
    getIssuableCoupons: (): Promise<
        AxiosResponse<IssuableCouponResponse[]>
    > => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/coupons/issuable',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 내 쿠폰 요약정보 가져오기
     * - 로그인한 사용자가 보유한 쿠폰의 정보를 요약하여 조회합니다.
     *
     * @param param0
     * @returns
     */
    getCouponsSummary: ({
        expireDay,
    }: {
        expireDay: string;
    }): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/coupons/summary',
            params: { expireDay },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 코드 쿠폰 발급하기
     * - 등록된 프로모션 코드를 이용해 쿠폰을 발급받습니다..
     *
     * @param param0
     * @returns
     */
    issueCouponByPromotionCode: (
        promotionCode: string,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `coupons/register-code/${promotionCode}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 쿠폰 발급하기
     * - 선택한 쿠폰번호에 해당하는 다운로드 쿠폰을 발급받습니다.
     *
     * @param couponNo
     * @param param1
     * @returns
     */
    issueCoupon: (
        couponNo: string,
        body?: { channelType: string },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/coupons/${couponNo}/download`,
            data: { channelType: body?.channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 쿠폰번호로 제외 대상 조회하기
     * - 선택한 쿠폰번호에 해당하는 제외 대상의 목록을 조회합니다.
     *
     * @param couponNo
     * @param param1
     * @returns
     */
    getExcludeTargetsByCouponNumber: (
        couponNo: string,
        { pageNumber, pageSize }: TargetParams,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/coupons/${couponNo}/exclude-targets`,
            params: { pageNumber, pageSize },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 쿠폰번호로 대상 조회하기
     * - 선택한 쿠폰번호에 해당하는 대상의 목록을 조회합니다.
     *
     * @param couponNo
     * @param param1
     * @returns
     */
    getCouponTargets: (
        couponNo: string,
        { pageNumber, pageSize }: TargetParams,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/coupons/${couponNo}/targets`,
            params: { pageNumber, pageSize },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 기획전 번호로 쿠폰 발급하기
     * - 해당 기획전에서 다운로드받을 수 있는 모든 쿠폰을 발급합니다.
     * @param eventNo
     * @returns
     */
    issueEventCoupons: (eventNo: string): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/coupons/events/${eventNo}/download`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 상품 번호로 쿠폰 발급하기
     * - 해당 상품에서 다운로드받을 수 있는 모든 쿠폰을 발급합니다.
     *
     * @param productNo
     * @param param1
     * @returns
     */
    issueProductCoupons: (
        productNo: string,
        { channelType }: { channelType: string },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/coupons/products/${productNo}/download`,
            data: { channelType },
        }),

    /**
     * 상품 번호로 발급 가능한 쿠폰 조회하기
     * - 해당 상품 상세정보에서 다운로드 할수 있는 모든 쿠폰을 조회합니다.
     *
     * @param productNo
     * @param param1
     * @returns
     */
    getIssuableCouponsByProductNo: (
        productNo: string,
        { channelType }: { channelType?: string },
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/coupons/products/${productNo}/issuable/coupons`,
            params: { channelType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default coupon;
