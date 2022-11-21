import { AxiosResponse } from 'axios';

import request from 'api/core';

const orderConfiguration = {
    orderConfigs: (): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/order-configs',
        }),
};

export default orderConfiguration;
