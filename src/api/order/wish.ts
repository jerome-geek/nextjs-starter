import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { ShoppingCartBody } from 'models/order';

const wish = {
    getWishList: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/wish',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    // TODO getWishList, getWishListCount를 제외한 나머지 함수는 wishNo || optionNo || productNo 등을 몰라서 error 발생함
    updateWishList: ({
        orderCnt,
        optionInputs,
        wishNo,
    }: Pick<ShoppingCartBody, 'orderCnt' | 'optionInputs'> & {
        wishNo: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: '/wish',
            data: {
                orderCnt,
                optionInputs,
                wishNo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    writeWishList: ({
        orderCnt,
        optionInputs,
        optionNo,
        productNo,
        additionalProductNo,
    }: Omit<ShoppingCartBody, 'channelType' | 'cartNo'> & {
        additionalProductNo: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/wish',
            data: {
                orderCnt,
                optionInputs,
                optionNo,
                productNo,
                additionalProductNo,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    deleteWishList: ({
        wishNos,
    }: {
        wishNos: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: '/wish',
            data: { wishNos },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getWishListCount: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: 'wish/count',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default wish;
