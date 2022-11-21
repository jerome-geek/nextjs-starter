import { AxiosResponse } from 'axios';

import request from 'api/core';
import { NaverPayOrderSheet, ShoppingCartBody } from 'models/order/index';

const naverPay = {
    // TODO 아래 함수 또한 orderSheetNo, productNo 가 없으므로 차후 테스트 必
    writeNaverPayOrderSheet: ({
        orderSheetNo,
        clientReturnUrl,
        nvadid,
        naco,
        items,
    }: NaverPayOrderSheet): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/payments/naver/orderSheet',
            data: { orderSheetNo, clientReturnUrl, nvadid, naco, items },
        }),

    checkNaverPayValidate: ({
        orderCnt,
        channelType,
        optionInputs,
        optionNo,
        productNo,
    }: Omit<ShoppingCartBody, 'cartNo'>): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/payments/naver/validate',
            data: { orderCnt, channelType, optionInputs, optionNo, productNo },
        }),

    registerWishList: ({
        productNo,
    }: {
        productNo: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/payments/naver/wish-list',
            data: { productNo },
        }),
};

export default naverPay;
