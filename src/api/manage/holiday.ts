import { AxiosResponse } from 'axios';

import request from 'api/core';

const holiday = {
    getHoliday: ({
        year,
        month,
    }: {
        year: number;
        month: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/holiday',
            params: { year, month },
        }),
};

export default holiday;
