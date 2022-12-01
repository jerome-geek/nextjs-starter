const BOARD = {
    NOTICE: process.env.NODE_ENV === 'development' ? '8064' : '8064',
    FAQ: process.env.NODE_ENV === 'development' ? '9216' : '9216',
    MANUAL: process.env.NODE_ENV === 'development' ? '9235' : '9235',
    GENUINE_REGISTER:
        process.env.NODE_ENV === 'development' ? '10057' : '10057',
};

export default BOARD;
