const BANNER = {
    MAIN_BAND_BANNER: process.env.NODE_ENV === 'development' ? '006' : '',
    MAIN_WEB_BANNER: process.env.NODE_ENV === 'development' ? '000' : '',
    MAIN_MOBILE_BANNER: process.env.NODE_ENV === 'development' ? '005' : '',
    MAIN_CATEGORY_BANNER: process.env.NODE_ENV === 'development' ? '004' : '',
    MAIN_ETC_BANNER: process.env.NODE_ENV === 'development' ? '008' : '',
    VC_MANAGER: process.env.NODE_ENV === 'development' ? '009' : '',
    VC_MANUAL: process.env.NODE_ENV === 'development' ? '010' : '',
    VC_GOLF_COURSE: process.env.NODE_ENV === 'development' ? '011' : '',
};

export default BANNER;
