import { isBoolean } from '@fxts/core';

import { shopbyTokenStorage } from 'utils/storage';

const isLogin = () => {
    const accessToken = shopbyTokenStorage.getAccessToken();

    return isBoolean(
        accessToken?.accessToken && accessToken?.expiry > new Date().getTime(),
    );
};

export { isLogin };
