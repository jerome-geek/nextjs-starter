import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { DOMESTIC } from 'models';

const KCPCertification = {
    authenticateAdult: ({ key }: { key: string }): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/kcp/age-verification',
            params: { key },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getKCPForm: ({
        returnUrl,
        domestic,
    }: {
        returnUrl: string;
        domestic?: DOMESTIC;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/kcp/id-verification/form',
            params: { returnUrl, domestic },
        }),

    getKCPCertificationResult: ({
        key,
    }: {
        key: string;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/kcp/id-verification/response',
            params: { key },
        }),
};

export default KCPCertification;
