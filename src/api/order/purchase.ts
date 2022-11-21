import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { PaymentReserve } from 'models/order';
import { tokenStorage } from 'utils/storage';

const accessTokenInfo = tokenStorage.getAccessToken();

const purchase = {
    // TODO orderSheetNo 를 모르므로 차후 테스트 必
    reservePayment: ({
        clientParams,
        extraData,
        orderMemo,
        bankAccountToDeposit,
        rentalInfo,
        payType,
        clientReturnUrl,
        coupons,
        useDefaultAddress,
        member,
        inAppYn,
        applyCashReceipt,
        orderTitle,
        tempPassword,
        saveAddressBook,
        updateMember,
        orderSheetNo,
        pgType,
        remitter,
        deliveryMemo,
        orderer,
        paymentAmtForVerification,
        shippingAddress,
        savesLastPayType,
        subPayAmt,
        cashReceipt,
        shippingAddresses,
    }: PaymentReserve): Promise<AxiosResponse> =>
        request({
            method: 'POST',
            url: '/payments/reserve',
            data: {
                clientParams,
                extraData,
                orderMemo,
                bankAccountToDeposit,
                rentalInfo,
                payType,
                clientReturnUrl,
                coupons,
                useDefaultAddress,
                member,
                inAppYn,
                applyCashReceipt,
                orderTitle,
                tempPassword,
                saveAddressBook,
                updateMember,
                orderSheetNo,
                pgType,
                remitter,
                deliveryMemo,
                orderer,
                paymentAmtForVerification,
                shippingAddress,
                savesLastPayType,
                subPayAmt,
                cashReceipt,
                shippingAddresses,
            },
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: accessTokenInfo?.accessToken || '',
            }),
        }),
};

export default purchase;
