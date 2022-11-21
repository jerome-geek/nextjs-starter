import { deviceDetect } from 'react-device-detect';

import { PLATFORM_TYPE } from 'models';

const getPlatform = (): PLATFORM_TYPE | null => {
    if (typeof window !== 'undefined') {
        const device = deviceDetect(navigator.userAgent);

        return device.isMobile ? PLATFORM_TYPE.MOBILE_WEB : PLATFORM_TYPE.PC;
    }
    return null;
};

/**
 * 빈 객체인지 확인
 * - 배열도 Object이므로 true를 반환하기 때문에, 추가로 Constructor도 확인한다
 *
 * @param {Object} obj
 * @returns Boolean
 */
const isEmptyObject = (obj: object) => {
    return obj && obj.constructor === Object && Object.keys(obj).length === 0;
};

export { getPlatform, isEmptyObject };
