import { AxiosResponse } from 'axios';

import request from 'api/core';
import { MallResponse } from 'models/mall';

const mall = {
    getMall: (): Promise<AxiosResponse<MallResponse>> =>
        request({ method: 'GET', url: '/malls' }),

    getMallPartners: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/malls/partners' }),

    getSslInfo: (): Promise<AxiosResponse> =>
        request({ method: 'GET', url: '/malls/ssl' }),
};

export default mall;
