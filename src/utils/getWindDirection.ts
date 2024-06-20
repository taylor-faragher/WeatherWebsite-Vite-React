/* eslint-disable indent */
const getWindDirection = (windDirectionNumber: number): string => {
    if (windDirectionNumber == 0 || windDirectionNumber > 360) return '(N/A)';

    switch (true) {
        case (windDirectionNumber >= 331 && windDirectionNumber <= 360) ||
            (windDirectionNumber >= 1 && windDirectionNumber <= 30):
            return '(N)';
        case windDirectionNumber >= 31 && windDirectionNumber <= 60:
            return '(NE)';
        case windDirectionNumber >= 61 && windDirectionNumber <= 120:
            return '(E)';
        case windDirectionNumber >= 121 && windDirectionNumber <= 150:
            return '(SE)';
        case windDirectionNumber >= 151 && windDirectionNumber <= 210:
            return '(S)';
        case windDirectionNumber >= 211 && windDirectionNumber <= 240:
            return '(SW)';
        case windDirectionNumber >= 241 && windDirectionNumber <= 300:
            return '(W)';
        case windDirectionNumber >= 301 && windDirectionNumber <= 330:
            return '(NW)';
        default: {
            return '(N/A)';
        }
    }
};

export default getWindDirection;
