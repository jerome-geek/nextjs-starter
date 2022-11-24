import { sort } from '@fxts/core';
import { BannerInfo } from 'models/display';

const sortBanners = (banners: BannerInfo[]) => {
    return sort((a, b) => a.displayOrder > b.displayOrder, banners);
};

export { sortBanners };
