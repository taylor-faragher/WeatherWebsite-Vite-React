import {formPictureObject} from './formPictureObject';

describe('formPictureObject', () => {
    it('should return the correct image and alt text for known icon', async () => {
        const icon = '01d';
        const result = await formPictureObject(icon);
        expect(result).toEqual({
            image: '/assets/01d.svg',
            imageAltText: 'Orange Sun',
        });
    });

    it('should return the correct image and alt text for another known icon', async () => {
        const icon = '10n';
        const result = await formPictureObject(icon);
        expect(result).toEqual({
            image: '/assets/10n.svg',
            imageAltText: 'white cloud with moon behind it and water is falling from white cloud',
        });
    });

    it('should return undefined alt text for unknown icon', async () => {
        const icon = 'unknown';
        const result = await formPictureObject(icon);
        expect(result).toEqual({
            image: '/assets/unknown.svg',
            imageAltText: undefined,
        });
    });
});
