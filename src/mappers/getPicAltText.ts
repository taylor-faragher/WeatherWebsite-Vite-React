export const getPicAltText = (pic: string): string => {
    const map: Record<string, string> = {
        '01d': 'Orange Sun',
        '02d': 'Orange Sun behind white clouds',
        '03d': 'White Cloud',
        '04d': 'white cloud with moon behind it',
        '09d': 'white cloud with dark cloud behind it and water is falling from white cloud',
        '10d': 'white cloud with orange sun behind it and water is falling from white cloud',
        '11d': 'white cloud with dark cloud behind it and lightning is coming from white cloud',
        '13d': 'snowflake',
        '50d': 'horizontal lines indicating fog',
        '01n': 'Orange Sun',
        '02n': 'Orange Sun behind white clouds',
        '03n': 'White Cloud',
        '04n': 'white cloud with dark cloud behind it',
        '09n': 'white cloud with dark cloud behind it and water is falling from white cloud',
        '10n': 'white cloud with moon behind it and water is falling from white cloud',
        '11n': 'white cloud with dark cloud behind it and lightning is coming from white cloud',
        '13n': 'snowflake',
        '50n': 'horizontal lines indicating fog',
    };
    return map[pic]!;
};
