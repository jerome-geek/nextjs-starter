import { AxiosResponse } from 'axios';

import request, { defaultHeaders } from 'api/core';
import { GetBannersResponse, skinBanners } from 'models/display';

const banner = {
    /**
     * 배너목록 조회하기
     *  - 코드 정보들로 배너들을 조회하는 API입니다
     *  - 원격 메모리 DB인 redis에 5분 캐시하여 사용하고 있습니다. (cached)
     *
     * @param bannerSectionCodes  조회할 배너 섹션 번호(,로 구분한 배열) / 샵바이 어드민에서 입력한 섹션 코드 번호입니다 (e.g. [001, 002, 003])
     * @returns
     */
    getBanners: (
        bannerSectionCodes: string[],
    ): Promise<AxiosResponse<GetBannersResponse[]>> =>
        request({
            method: 'GET',
            url: `/display/banners/${bannerSectionCodes}`,
            headers: Object.assign({}, defaultHeaders(), {
                accessToken: localStorage.getItem('accessToken') || '',
            }),
        }),

    getSkinBanners: ({
        skinCode,
        bannerGroupCodes,
    }: skinBanners): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: '/display/skin-banners',
            params: {
                skinCode,
                bannerGroupCodes,
            },
        }),

    getBannerGroupBySkin: ({
        isPreview = false,
    }: {
        isPreview: Boolean;
    }): Promise<AxiosResponse> =>
        request({
            method: 'GET',
            url: 'skin-banners/groups-by-skin',
            params: {
                isPreview,
            },
        }),
};

export default banner;
