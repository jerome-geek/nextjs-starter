import { AxiosResponse } from 'axios';

import request from 'api/core';
import { PAGE_TYPES } from 'models/manage';

const page = {
    getExternalScripts: ({
        pageTypes,
    }: {
        pageTypes: PAGE_TYPES;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/page/scripts',
            params: { pageTypes },
        }),
};

export default page;
