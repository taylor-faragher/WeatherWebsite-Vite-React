import getWindDirection from './getWindDirection';

describe('getWindDirection', () => {
    it('should return "(N/A)" for 0', () => {
        expect(getWindDirection(0)).toBe('(N/A)');
    });

    it('should return "(N/A)" for values greater than 360', () => {
        expect(getWindDirection(361)).toBe('(N/A)');
        expect(getWindDirection(400)).toBe('(N/A)');
    });

    it('should return "(N)" for values between 331 and 360', () => {
        expect(getWindDirection(331)).toBe('(N)');
        expect(getWindDirection(345)).toBe('(N)');
        expect(getWindDirection(360)).toBe('(N)');
    });

    it('should return "(N)" for values between 0 and 30', () => {
        expect(getWindDirection(1)).toBe('(N)');
        expect(getWindDirection(15)).toBe('(N)');
        expect(getWindDirection(30)).toBe('(N)');
    });

    it('should return "(NE)" for values between 31 and 60', () => {
        expect(getWindDirection(31)).toBe('(NE)');
        expect(getWindDirection(45)).toBe('(NE)');
        expect(getWindDirection(60)).toBe('(NE)');
    });

    it('should return "(E)" for values between 61 and 120', () => {
        expect(getWindDirection(61)).toBe('(E)');
        expect(getWindDirection(90)).toBe('(E)');
        expect(getWindDirection(120)).toBe('(E)');
    });

    it('should return "(SE)" for values between 121 and 150', () => {
        expect(getWindDirection(121)).toBe('(SE)');
        expect(getWindDirection(135)).toBe('(SE)');
        expect(getWindDirection(150)).toBe('(SE)');
    });

    it('should return "(S)" for values between 151 and 210', () => {
        expect(getWindDirection(151)).toBe('(S)');
        expect(getWindDirection(180)).toBe('(S)');
        expect(getWindDirection(210)).toBe('(S)');
    });

    it('should return "(SW)" for values between 211 and 240', () => {
        expect(getWindDirection(211)).toBe('(SW)');
        expect(getWindDirection(225)).toBe('(SW)');
        expect(getWindDirection(240)).toBe('(SW)');
    });

    it('should return "(W)" for values between 241 and 300', () => {
        expect(getWindDirection(241)).toBe('(W)');
        expect(getWindDirection(270)).toBe('(W)');
        expect(getWindDirection(300)).toBe('(W)');
    });

    it('should return "(NW)" for values between 301 and 330', () => {
        expect(getWindDirection(301)).toBe('(NW)');
        expect(getWindDirection(315)).toBe('(NW)');
        expect(getWindDirection(330)).toBe('(NW)');
    });
});
