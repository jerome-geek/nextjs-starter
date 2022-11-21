import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';

const marketing = {
    // TODO 500 error productNo 모름
    getSNSShareConfig: ({
        productNo,
    }: {
        productNo: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/marketing/sns-share',
            params: { productNo },
        }),

    getFacebookPixelId: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/marketing/facebook/pixel',
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),
};

export default marketing;
