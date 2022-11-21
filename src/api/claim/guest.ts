import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CLAIM_TYPE } from 'models';
import {
    CancelOptionsBody,
    GetEstimatedRefundPriceBody,
    ReturnOption,
    RefundAccountInfo,
    ExchangeRequest,
} from 'models/claim';

const guest = {
    // TODO guestToken이 없기 때문에 나중에 테스트 필요
    cancelPendingDepositOrder: ({
        claimReasonDetail,
        responsibleObjectType,
        claimType,
        claimedProductOptions,
        saveBankAccountInfo,
        bankAccountInfo,
        claimReasonType,
        refundsImmediately,
    }: CancelOptionsBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/guest/claims/cancel',
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
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getRefundPrice: ({
        responsibleObjectType,
        claimedProductOptions,
        claimType,
        productCnt,
        claimReasonType,
        returnWayType,
    }: GetEstimatedRefundPriceBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/guest/claims/estimate',
            data: {
                responsibleObjectType,
                claimedProductOptions,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

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
    }: ReturnOption & GetEstimatedRefundPriceBody): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/guest/claims/return',
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
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    updateReturnAccount: (
        claimNo: string,
        { depositorName, bank, account }: RefundAccountInfo,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/claims/${claimNo}/account`,
            data: { depositorName, bank, account },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    checkClaimValidation: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/claims/${claimNo}/check-withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getClaimDetailByClaimNo: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/claims/${claimNo}/result`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    cancelClaimByClaimNo: (claimNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/claims/${claimNo}/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getContentsForClaim: (
        orderOptionNo: string,
        { claimType }: { claimType: CLAIM_TYPE },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims`,
            params: { claimType },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

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
            url: `/guest/order-options/${orderOptionNo}/claims/cancel`,
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
                guestToken: localStorage.getItem('guestToken') || '',
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
            url: `/guest/order-options/${orderOptionNo}/claims/estimate`,
            params: {
                responsibleObjectType,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    requestExchange: (
        orderOptionNo: string,
        {
            responsibleObjectType,
            claimType,
            productCnt,
            claimReasonType,
            returnWayType,
            claimImageUrls,
            claimReasonDetail,
            bankAccountInfo,
            saveBankAccountInfo,
            returnAddress,
            deliveryCompanyType,
            invoiceNo,
            exchangeAddress,
            exchangeOption,
        }: Omit<GetEstimatedRefundPriceBody, 'claimedProductOptions'> &
            ReturnOption &
            ExchangeRequest,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/exchange`,
            data: {
                responsibleObjectType,
                claimType,
                productCnt,
                claimReasonType,
                returnWayType,
                claimImageUrls,
                claimReasonDetail,
                bankAccountInfo,
                saveBankAccountInfo,
                returnAddress,
                deliveryCompanyType,
                invoiceNo,
                exchangeAddress,
                exchangeOption,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    getClaimDetailByOptionNo: (orderOptionNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/order-options/${orderOptionNo}/claims/result`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    requestReturnOfSingleOption: (
        orderOptionNo: string,
        {
            claimImageUrls,
            claimType,
            productCnt,
            claimReasonType,
            claimReasonDetail,
            bankAccountInfo,
            saveBankAccountInfo,
            returnAddress,
            returnWayType,
            deliveryCompanyType,
            invoiceNo,
            responsibleObjectType,
        }: ReturnOption &
            Omit<GetEstimatedRefundPriceBody, 'claimedProductOptions'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/order-options/${orderOptionNo}/claims/return`,
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
                deliveryCompanyType,
                invoiceNo,
                responsibleObjectType,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    cancelClaimByOrderOptionNo: (
        orderOptionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/claims/withdraw`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),

    requestCancel: (
        orderNo: string,
        {
            claimReasonDetail,
            responsibleObjectType,
            claimType,
            saveBankAccountInfo,
            bankAccountInfo,
            claimReasonType,
            refundsImmediately,
        }: Omit<CancelOptionsBody, 'claimedProductOptions'>,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/orders/${orderNo}/claims/cancel`,
            data: {
                claimReasonDetail,
                responsibleObjectType,
                claimType,
                saveBankAccountInfo,
                bankAccountInfo,
                claimReasonType,
                refundsImmediately,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken: localStorage.getItem('guestToken') || '',
            }),
        }),
};

export default guest;
