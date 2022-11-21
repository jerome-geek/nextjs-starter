import BREAKPOINTS from 'const/breakpoints';

export const mediaQuery = (maxWidth: number) => `
    @media (max-width: ${maxWidth}px)
`;

const media = {
    /* mobile */
    xsmall: mediaQuery(375), // TODO: 제거 예정
    small: mediaQuery(BREAKPOINTS.SMALL),
    /* tablets */
    medium: mediaQuery(BREAKPOINTS.MEDIUM),
    large: mediaQuery(BREAKPOINTS.LARGE),
    /* desktops */
    xlarge: mediaQuery(BREAKPOINTS.XLARGE),
    xxlarge: mediaQuery(BREAKPOINTS.XXLARGE),
    custom: mediaQuery,
};

export default media;
