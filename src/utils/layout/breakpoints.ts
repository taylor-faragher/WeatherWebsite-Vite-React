type BreakPoints = {
    desktop: string;
    desktopBig: string;
    tablet: string;
    tabletBig: string;
    mobileBig: string;
    mobileMid: string;
    mobile: string;
};

export type BreakPointsByWidth = {
    desktop: number;
    desktopBig: number;
    tablet: number;
    tabletBig: number;
    mobileBig: number;
    mobileMid: number;
    mobile: number;
};

export const sizes: BreakPointsByWidth = {
    mobile: 0,
    mobileMid: 340,
    mobileBig: 513,
    tablet: 769,
    tabletBig: 1025,
    desktop: 1201,
    desktopBig: 1921,
};

export const breakPoints: BreakPoints = {
    desktop: `(min-width: ${sizes.desktop}px)`,
    desktopBig: `(min-width: ${sizes.desktopBig}px)`,
    tabletBig: `(min-width: ${sizes.tabletBig}px)`,
    tablet: `(min-width: ${sizes.tablet}px)`,
    mobileBig: `(min-width: ${sizes.mobileBig}px)`,
    mobileMid: `(min-width: ${sizes.mobileMid}px)`,
    mobile: `(min-width: ${sizes.mobile}px)`,
};
