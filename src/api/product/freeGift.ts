import { AxiosResponse } from 'axios';

import request from 'api/core';

const freeGift = {
    // TODO productNo 없음 message: 상품이 존재하지 않습니다. [상품번호 : 123]
    getFreeGiftCondition: (productNo: string): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: `/free-gift-condition/${productNo}`,
        }),
};

export default freeGift;
