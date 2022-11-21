import { AxiosResponse } from 'axios';

import request from 'api/core';

const instagram = {
    getFeeds: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/shopby/instagram/media',
        }),
};

export default instagram;
