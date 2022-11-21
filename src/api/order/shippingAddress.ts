import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { AddressRequest, ShippingAddressResponse } from 'models/order';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const shippingAddress = {
    getShippingAddressList: (): Promise<
        AxiosResponse<ShippingAddressResponse>
    > =>
        request({
            method: 'GET',
            url: '/profile/shipping-addresses',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    registerShippingAddress: ({
        addressName,
        addressType,
        defaultYn,
        receiverName,
        receiverZipCd,
        receiverAddress,
        receiverJibunAddress,
        receiverDetailAddress,
        receiverContact1,
        receiverContact2,
        customsIdNumber,
        countryCd,
    }: AddressRequest): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/profile/shipping-addresses',
            data: {
                addressName,
                addressType,
                defaultYn,
                receiverName,
                receiverZipCd,
                receiverAddress,
                receiverJibunAddress,
                receiverDetailAddress,
                receiverContact1,
                receiverContact2,
                customsIdNumber,
                countryCd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    getRecentShippingAddress: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/profile/shipping-addresses/recent',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    // TODO addressNo 모름 404 error, message 없음
    getShippingAddress: (addressNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/profile/shipping-addresses/${addressNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    // TODO addressNo 모름 404 error, message: 배송지가 존재하지 않습니다 이하 함수들은 addressNo 모름
    updateShippingAddress: (
        addressNo: string,
        {
            addressName,
            addressType,
            defaultYn,
            receiverName,
            receiverZipCd,
            receiverAddress,
            receiverJibunAddress,
            receiverDetailAddress,
            receiverContact1,
            receiverContact2,
            customsIdNumber,
            countryCd,
        }: AddressRequest,
    ): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/shipping-addresses/${addressNo}`,
            data: {
                addressName,
                addressType,
                defaultYn,
                receiverName,
                receiverZipCd,
                receiverAddress,
                receiverJibunAddress,
                receiverDetailAddress,
                receiverContact1,
                receiverContact2,
                customsIdNumber,
                countryCd,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    deleteShippingAddress: (addressNo: string): Promise<AxiosResponse> =>
        request({
            method: 'DELETE',
            url: `/profile/shipping-addresses/${addressNo}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),

    updateDefaultShippingAddress: (addressNo: string): Promise<AxiosResponse> =>
        request({
            method: 'PUT',
            url: `/profile/shipping-addresses/${addressNo}/default`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
};

export default shippingAddress;
