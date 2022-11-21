import BREAKPOINTS from 'const/breakpoints';

const isMobile = (width: number) => width <= BREAKPOINTS.MEDIUM;
const isTablet = (width: number) =>
    width > BREAKPOINTS.MEDIUM && width <= BREAKPOINTS.XLARGE;
const isDesktop = (width: number) => width > BREAKPOINTS.XLARGE;

export { isMobile, isTablet, isDesktop };
