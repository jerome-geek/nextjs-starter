import { getPlatform } from 'utils';
import { shopbyTokenStorage } from 'utils/storage';

const payment = {
    setConfiguration: () => {
        const accessTokenInfo = shopbyTokenStorage.getAccessToken();

        return window.NCPPay.setConfiguration({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            confirmUrl: `${window.location.origin}/order/complete`,
            platform: getPlatform(),
            accessToken: accessTokenInfo?.accessToken || '',
        });
    },
    reservation: (paymentData: any) => {
        if (!window.NCPPay) {
            throw new Error('ncp_pay 스크립트를 로드해주세요.');
        }

        window.NCPPay.reservation(paymentData);
    },
};

export default Object.freeze(payment);
