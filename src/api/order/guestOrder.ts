import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { CLAIM_TYPE, ORDER_REQUEST_TYPE } from 'models';
import {
    CartList,
    DeliveryBody,
    PasswordParams,
    CashReceiptBody,
    ShoppingCartBody,
    TokenIssueBody,
    OrderDetailResponse,
} from 'models/order';

const guestOrder = {
    getCart: (
        body: ShoppingCartBody[],
        {
            divideInvalidProducts,
        }: {
            divideInvalidProducts?: Boolean;
        },
    ): Promise<AxiosResponse<CartList>> =>
        request({
            method: 'POST',
            url: '/guest/cart',
            params: { divideInvalidProducts },
            data: body,
        }),

    /**
     * 비회원 주문 상세 조회하기
     * - 비회원 주문의 상세정보를 조회하는 API 입니다.
     *
     * @param guestToken
     * @param orderNo
     * @param param1
     * @returns
     */
    getOrderDetail: (
        guestToken: string,
        orderNo: string,
        params?: { orderRequestType: ORDER_REQUEST_TYPE },
    ): Promise<AxiosResponse<OrderDetailResponse>> => {
        return request({
            method: 'GET',
            url: `/guest/orders/${orderNo}`,
            params: { orderRequestType: params?.orderRequestType },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken,
            }),
        });
    },

    // TODO 함수가 하는 역할과 함수 내용이 다름
    issueOrderToken: (
        orderNo: string,
        { password, name, mobileNo, email, orderRequestType }: TokenIssueBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/orders/${orderNo}`,
            data: { password, name, mobileNo, email, orderRequestType },
        }),

    // TODO GuestToken, orderOptionNo 모름, 400 error 발생 추후 테스트 필요
    confirmOrder: (
        guestToken: string,
        orderOptionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/confirm`,
            headers: Object.assign({}, defaultHeaders(), {
                guestToken,
            }),
        }),

    // TODO GuestToken, orderOptionNo 모름, 400 error 발생 추후 테스트 필요
    confirmDeliveryCompletion: (
        guestToken: string,
        orderOptionNo: string,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/delivery-done`,
            data: { orderOptionNo },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken,
            }),
        }),

    // TODO GuestToken, orderNo 모름, 400 error 발생 추후 테스트 필요
    requestReceipt: (
        guestToken: string,
        orderNo: string,
        { cashReceiptIssuePurposeType, cashReceiptKey }: CashReceiptBody,
    ): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: `/guest/orders/${orderNo}/cashReceipt`,
            data: { cashReceiptIssuePurposeType, cashReceiptKey },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken,
            }),
        }),

    // TODO GuestToken, orderNo 모름, 400 error 발생 추후 테스트 필요, claim으로 이름 변경
    getGuestOrderDetail: (
        orderNo: string,
        {
            orderRequestType,
            claimType,
        }: { orderRequestType?: ORDER_REQUEST_TYPE; claimType?: CLAIM_TYPE },
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/guest/orders/${orderNo}/claim`,
            params: { orderRequestType, claimType },
        }),

    // TODO guestToken, orderNo 모름, 400 error 발생 추후 테스트 필요
    updateDeliveryInfo: (
        guestToken: string,
        orderNo: string,
        {
            receiverZipCd,
            receiverAddress,
            receiverJibunAddress,
            receiverDetailAddress,
            receiverName,
            receiverContact1,
            receiverContact2,
            customIdNumber,
            countryCd,
            deliveryMemo,
            add,
        }: DeliveryBody & { add: Boolean },
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/guest/order/${orderNo}/deliveries`,
            params: { add },
            data: {
                receiverZipCd,
                receiverAddress,
                receiverJibunAddress,
                receiverDetailAddress,
                receiverName,
                receiverContact1,
                receiverContact2,
                customIdNumber,
                countryCd,
                deliveryMemo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                guestToken,
            }),
        }),

    // TODO orderNo 모름, 400 error 발생 추후 테스트 필요
    sendPasswordByEmail: (
        orderNo: string,
        { replyType, mobileNo, email, name }: PasswordParams,
    ): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `guest/orders/${orderNo}/forgot-password`,
            params: { replyType, mobileNo, email, name },
        }),
};

export default guestOrder;
