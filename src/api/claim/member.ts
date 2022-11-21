import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import request, { defaultHeaders } from 'api/core';
import { CLAIM_TYPE } from 'models';
import {
    GetEstimatedRefundPriceBody,
    CancelOptionsBody,
    ExchangeRequest,
    MemberClaim,
    RefundAccountInfo,
    ReturnOption,
    RequestExchangeBody,
    ReturnBody,
    GetOrderOptionDetailForClaimResponse,
} from 'models/claim';
import { tokenStorage } from 'utils/storage';

interface GetClaimListParams extends Paging, SearchDate {
    claimTypes: Nullable<CLAIM_TYPE>;
}

const member = {
    /**
     * 회원 클레임 목록 조회하기
     *  - 클레임 목록을 조회하는 API입니다.
     */
    getClaimList: (
        params: GetClaimListParams = {
            claimTypes: null,
            pageNumber: 1,
            pageSize: 10,
            hasTotalCount: false,
            startYmd: dayjs().subtract(3, 'months').format('YYYY-MM-DD'),
            endYmd: dayjs().format('YYYY-MM-DD'),
        },
    ): Promise<AxiosResponse<ItemList<MemberClaim>>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: '/profile/claims',
            params: {
                claimTypes: params.claimTypes,
                endYmd: params.endYmd,
                hasTotalCount: params.hasTotalCount,
                pageNumber: params.pageNumber,
                pageSize: params.pageSize,
                startYmd: params.startYmd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 회원 옵션취소 신청하기(복수옵션)
     *  - 다수의 선택옵션을 취소신청하는 API입니다.
     *
     * @param param0
     * @returns
     */
    requestCancelOptions: ({
        claimReasonDetail,
        responsibleObjectType,
        claimType,
        claimedProductOptions,
        saveBankAccountInfo,
        bankAccountInfo,
        claimReasonType,
        refundsImmediately,
    }: CancelOptionsBody): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: '/profile/claims/cancel',
            data: {
                claimReasonDetail,
                responsibleObjectType,
                claimType,
                claimedProductOptions,
                saveBankAccountInfo,
                bankAccountInfo,
                claimReasonType,
                refundsImmediately,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 회원 클레임시 변경되는 주문의 환불 예상금액 계산하기(복수옵션)
     *  - 다수의 선택옵션을 취소할 경우 환불 예상금액을 미리 계산하는 API입니다.
     *
     * @param param0
     * @returns
     */
    getEstimatedRefundPrice: (
        body: GetEstimatedRefundPriceBody,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: '/profile/claims/estimate',
            data: {
                claimType: body.claimType,
                productCnt: body.productCnt,
                claimReasonType: body.claimReasonType,
                returnWayType: body.returnWayType,
                claimedProductOptions: body.claimedProductOptions,
                responsibleObjectType: body.responsibleObjectType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 회원 반품 신청하기(복수옵션)
     *  - 다수의 선택옵션을 반품하는 API입니다.
     */
    requestReturnOfMultipleOptions: ({
        claimImageUrls,
        claimType,
        productCnt,
        claimReasonType,
        claimReasonDetail,
        bankAccountInfo,
        saveBankAccountInfo,
        returnAddress,
        returnWayType,
        claimedProductOptions,
        deliveryCompanyType,
        invoiceNo,
        responsibleObjectType,
    }: ReturnOption & GetEstimatedRefundPriceBody): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: '/profile/claims/return',
            data: {
                claimImageUrls,
                claimType,
                productCnt,
                claimReasonType,
                claimReasonDetail,
                bankAccountInfo,
                saveBankAccountInfo,
                returnAddress,
                returnWayType,
                claimedProductOptions,
                deliveryCompanyType,
                invoiceNo,
                responsibleObjectType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    /**
     * 회원 환불 계좌 정보 수정하기
     *  - 환불 계좌 정보를 수정하는 API입니다.
     *
     * @param claimNo
     * @param param1
     * @returns
     */
    updateReturnAccount: (
        claimNo: string,
        body: RefundAccountInfo,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'PUT',
            url: `/profile/claims/${claimNo}/account`,
            data: {
                bank: body.bank,
                account: body.account,
                depositorName: body.depositorName,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    checkClaimValidation: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/claims/${claimNo}/check-withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    /**
     * 회원 클레임 상세보기(클레임 번호)
     *  - 클레임 번호로 클레임 세부 내역을 조회합니다.
     *
     * @param claimNo
     * @returns
     */
    getClaimDetailByClaimNo: (claimNo: string): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/profile/claims/${claimNo}/result`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    cancelClaimByClaimNo: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/claims/${claimNo}/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    /**
     * 회원 클레임 신청을 위한 정보 조회하기
     *  - 선택옵션에 대한 클레임을 신청할 때 필요한 정보를 조회합니다.
     *
     * @param orderOptionNo
     * @param param1
     * @returns
     */
    getOrderOptionDetailForClaim: (
        orderOptionNo: string,
        params: { claimType: CLAIM_TYPE },
    ): Promise<AxiosResponse<GetOrderOptionDetailForClaimResponse>> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'GET',
            url: `/profile/order-options/${orderOptionNo}/claims`,
            params: { claimType: params.claimType },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    // TODO: 함수명 변경
    requestCancelClaimOption: (
        orderOptionNo: string,
        {
            claimReasonDetail,
            responsibleObjectType,
            claimType,
            saveBankAccountInfo,
            bankAccountInfo,
            claimReasonType,
            refundsImmediately,
            productCnt,
        }: Omit<CancelOptionsBody, 'claimedProductOptions'> & {
            productCnt: number;
        },
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/profile/order-options/${orderOptionNo}/claims/cancel`,
            data: {
                claimReasonDetail,
                responsibleObjectType,
                claimType,
                saveBankAccountInfo,
                bankAccountInfo,
                claimReasonType,
                refundsImmediately,
                productCnt,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getClaimOptionPrice: (
        orderOptionNo: string,
        {
            responsibleObjectType,
            claimType,
            productCnt,
            claimReasonType,
            returnWayType,
        }: Omit<GetEstimatedRefundPriceBody, 'claimedProductOptions'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/order-options/${orderOptionNo}/claims/estimate`,
            params: {
                responsibleObjectType,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    /**
     * 회원 클레임 교환 신청하기
     *  - 선택옵션을 교환하는 API입니다.
     *
     * @param orderOptionNo
     * @param param1
     * @returns
     */
    requestExchange: (
        orderOptionNo: string,
        body: RequestExchangeBody,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/profile/order-options/${orderOptionNo}/claims/exchange`,
            data: {
                claimReasonDetail: body.claimReasonDetail,
                responsibleObjectType: body.responsibleObjectType,
                additionalPayRemitter: body.additionalPayRemitter,
                bankAccountInfo: body.bankAccountInfo,
                productCnt: body.productCnt,
                claimReasonType: body.claimReasonType,
                returnWayType: body.returnWayType,
                deliveryCompanyType: body.deliveryCompanyType,
                claimImageUrls: body.claimImageUrls,
                returnAddress: body.returnAddress,
                additionalPayBankAccount: body.additionalPayBankAccount,
                saveBankAccountInfo: body.saveBankAccountInfo,
                additionalPayType: body.additionalPayType,
                exchangeAddress: body.exchangeAddress,
                exchangeOption: body.exchangeOption,
                invoiceNo: body.invoiceNo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    getClaimDetailByOrderOptionNo: (
        orderOptionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/order-options/${orderOptionNo}/claims/result`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    /**
     * 회원 반품 신청하기(단일옵션)
     *  - 단일옵션을 반품하는 API입니다.
     */
    requestReturnOfSingleOption: (
        orderOptionNo: string,
        body: ReturnBody,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/profile/order-options/${orderOptionNo}/claims/return`,
            data: {
                claimReasonDetail: body.claimReasonDetail,
                responsibleObjectType: body.responsibleObjectType,
                claimType: body.claimType,
                bankAccountInfo: body.bankAccountInfo,
                saveBankAccountInfo: body.saveBankAccountInfo,
                productCnt: body.productCnt,
                claimReasonType: body.claimReasonType,
                returnWayType: body.returnWayType,
                deliveryCompanyType: body.deliveryCompanyType,
                claimImageUrls: body.claimImageUrls,
                invoiceNo: body.invoiceNo,
                returnAddress: body.returnAddress,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },

    cancelClaimByOrderOptionNo: (
        orderOptionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/order-options/${orderOptionNo}/claims/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    /**
     * 회원 주문취소 신청하기
     *  - 주문을 취소신청하는 API입니다.
     * @param orderNo
     * @param param1
     * @returns
     */
    requestCancel: (
        orderNo: string,
        body: Omit<CancelOptionsBody, 'claimedProductOptions'>,
    ): Promise<AxiosResponse> => {
        const accessTokenInfo = tokenStorage.getAccessToken();

        return request({
            method: 'POST',
            url: `/profile/orders/${orderNo}/claims/cancel`,
            data: {
                claimReasonDetail: body.claimReasonDetail,
                responsibleObjectType: body.responsibleObjectType,
                claimType: body.claimType,
                saveBankAccountInfo: body.saveBankAccountInfo,
                bankAccountInfo: body.bankAccountInfo,
                claimReasonType: body.claimReasonType,
                refundsImmediately: body.refundsImmediately,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        });
    },
};

export default member;
