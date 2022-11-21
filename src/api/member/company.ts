import { AxiosResponse } from 'axios';

import request from 'api/core';

const company = {
    getJoinableCompanies: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/companies',
        }),
};

export default company;
