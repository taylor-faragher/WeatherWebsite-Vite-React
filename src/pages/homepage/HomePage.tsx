import styled from 'styled-components';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {getFontWeight} from '../../utils/layout/getFontWeight';
import {ZipCodeForm} from '../shared/ZipCodeForm';
import {useNavigate} from 'react-router-dom';

const ZipCodeColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const WelcomeTitle = styled.h1`
    font-weight: ${getFontWeight('heavy')};
    line-height: 1.2;
    text-align: center;
    margin-bottom: 0;

    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(9)};
    }
    @media screen and ${breakPoints.tabletBig} {
        font-size: ${getFontSize(9)};
    }
`;

const Title = styled.h1`
    font-weight: 700;
    line-height: 1.2;
    text-align: center;

    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(6)};
    }
    @media screen and ${breakPoints.tablet} {
        font-size: ${getFontSize(7)};
    }
`;

const HomePage = () => {
    const navigate = useNavigate();

    const navigateToResult = (zipCode: string): void => {
        navigate(`/result?zipCode=${zipCode}`);
    };

    return (
        <ZipCodeColumn>
            <WelcomeTitle data-test-id='HomePage_WelcomeTitle'>Welcome!</WelcomeTitle>
            <Title data-test-id='HomePage_Title'>Get your current weather below!</Title>
            <ZipCodeForm placeHolderText={'5-Digit Zip Code'} pageNavigation={navigateToResult} />
        </ZipCodeColumn>
    );
};

export default HomePage;
