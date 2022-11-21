import { AxiosResponse } from 'axios';

import request from 'api/core';

const additionalDiscount = {
    // TODO headers에 값을 clientId 만 넣어야 하지만 지장이 없을거라 생각함(404 error, message: "적용가능한 추가할인이 존재하지 않습니다.") 만일 상품 등록 이후에도 오류시 변경
    getAdditionalDiscount: ({
        productNo,
    }: {
        productNo: number;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/additional-discounts/by-product-no',
            params: { productNo },
        }),
};

export default additionalDiscount;
