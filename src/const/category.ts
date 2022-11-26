const CATEGORY = {
    RANGE_FINDER: process.env.NODE_ENV === 'development' ? 103723 : 103723, // 1
    YARDAGE_BOOK: process.env.NODE_ENV === 'development' ? 103729 : 103729, // 2
    CLOCK_TYPE: process.env.NODE_ENV === 'development' ? 103726 : 103726, // 2
    LASER_TYPE: process.env.NODE_ENV === 'development' ? 103727 : 103727, // 2
    VOICE_TYPE: process.env.NODE_ENV === 'development' ? 103728 : 103728, // 2
    LAUNCH_MONITOR: process.env.NODE_ENV === 'development' ? 103724 : 103724, // 1
    ACCESSORY: process.env.NODE_ENV === 'development' ? 103731 : 103731, // 1
    CLOCK_TYPE_CABLE: process.env.NODE_ENV === 'development' ? 104153 : 104153, // 2
    VOICECADDIE_GOODS: process.env.NODE_ENV === 'development' ? 104154 : 104154, // 2
    VSE_ACCESSORY: process.env.NODE_ENV === 'development' ? 104155 : 104155, // 2
};

export default CATEGORY;
