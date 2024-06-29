import {useNavigate, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {useContext, useState} from 'react';
import {Loader} from '../shared/Loader';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {ZipCodeForm} from '../shared/ZipCodeForm';
import PremiumResults from './PremiumResults';
import {FreemiumWeatherItem, PremiumWeatherItem} from 'src/types/types';
import FreemiumResults from './FreemiumResults';
import {useScrollToTop} from '../../hooks/useScrollToTop';
import useWeather from '../../services/getWeather';
import {AccountContext} from '../../services/Account';

const ResultsSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and ${breakPoints.mobile} {
        padding-top: 0;
        padding-bottom: 85px;
    }
    @media screen and ${breakPoints.tablet} {
        padding-top: 25px;
        padding-bottom: 95px;
    }
    @media screen and ${breakPoints.tabletBig} {
        padding-top: 75px;
        padding-bottom: 0px;
    }
`;

const ZipCodeTitle = styled.h1`
    text-align: center;
    @media screen and ${breakPoints.mobile} {
        font-size: ${getFontSize(7)};
    }
    @media screen and ${breakPoints.tablet} {
        margin: 0;
        font-size: ${getFontSize(9)};
    }
`;

const ResultPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [zipCode, setZipCode] = useState(searchParams.get('zipCode'));
    const {user} = useContext(AccountContext);
    const {data, error, isLoading} = useWeather(zipCode as string);

    if (error) navigate('/error');

    useScrollToTop();

    return (
        <>
            <ResultsSection data-test-id='ResultPage_ResultsSection'>
                <ZipCodeTitle data-test-id='ResultPage_ZipCodeTitle'>Weather Results for {zipCode}</ZipCodeTitle>
                {isLoading && (
                    <div>
                        <Loader />
                    </div>
                )}
                {!isLoading && (
                    <>
                        {user && <PremiumResults data={data as PremiumWeatherItem} />}
                        {!user && <FreemiumResults data={data as FreemiumWeatherItem} />}

                        <ZipCodeForm
                            data-test-id='ResultPage_ZipCodeForm'
                            placeHolderText={'Search Again!'}
                            setZipCode={setZipCode}
                        />
                    </>
                )}
            </ResultsSection>
        </>
    );
};

export default ResultPage;
