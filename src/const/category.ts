const CATEGORY = {
    RANGE_FINDER: process.env.NODE_ENV === 'development' ? 103723 : 0, // 1
    YARDAGE_BOOK: process.env.NODE_ENV === 'development' ? 103729 : 0, // 2
    CLOCK_TYPE: process.env.NODE_ENV === 'development' ? 103726 : 0, // 2
    LASER_TYPE: process.env.NODE_ENV === 'development' ? 103727 : 0, // 2
    VOICE_TYPE: process.env.NODE_ENV === 'development' ? 103728 : 0, // 2
    LAUNCH_MONITOR: process.env.NODE_ENV === 'development' ? 103724 : 0, // 1
    ACCESSORY: process.env.NODE_ENV === 'development' ? 103731 : 0, // 1
    CLOCK_TYPE_CABLE: process.env.NODE_ENV === 'development' ? 104153 : 0, // 2
    VOICECADDIE_GOODS: process.env.NODE_ENV === 'development' ? 104154 : 0, // 2
    VSE_ACCESSORY: process.env.NODE_ENV === 'development' ? 104155 : 0, // 2
};

export default CATEGORY;
