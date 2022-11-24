import { isBoolean } from '@fxts/core';

import { shopbyTokenStorage } from 'utils/storage';

const isLogin = () => {
    const accessToken = shopbyTokenStorage.getAccessToken();

    return (
        !!accessToken?.accessToken &&
        accessToken?.expiry - new Date().getTime() > 0
    );
};

export { isLogin };
