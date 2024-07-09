import {useNavigate, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import {useContext, useEffect, useState} from 'react';
import {Loader} from '../shared/Loader';
import {breakPoints} from '../../utils/layout/breakpoints';
import {getFontSize} from '../../utils/layout/getFontSize';
import {ZipCodeForm} from '../shared/ZipCodeForm';
import PremiumResults from './PremiumResults';
import {FreemiumWeatherItem, PremiumWeatherItem} from 'src/types/types';
import FreemiumResults from './FreemiumResults';
import {useScrollToTop} from '../../hooks/useScrollToTop';
import {AccountContext} from '../../services/AccountProvider';
import {fetchPremiumWeather} from '../../gateways/PremiumWeatherGateway';
import {useQuery} from '@tanstack/react-query';
import {fetchFreemiumWeather} from '../../gateways/FreemiumWeatherGateway';

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
    const [showPremium, setShowPremium] = useState(false);
    const [showFreemium, setShowFreemium] = useState(false);
    const [user, setUser] = useState(null);
    const [zipCode, setZipCode] = useState(searchParams.get('zipCode'));
    const {getSession} = useContext(AccountContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const {user} = await getSession();
                if (user) {
                    setUser(user);
                    setShowPremium(true);
                }
            } catch {
                setShowFreemium(true);
            }
        };
        fetchUser();
    }, [getSession]);

    const {
        data: premiumData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ['fetchPremiumWeather', zipCode],
        queryFn: () => fetchPremiumWeather(zipCode as string, user),
        enabled: showPremium,
    });

    const {
        data: freemiumData,
        error: freemiumError,
        isLoading: freemiumIsLoading,
    } = useQuery({
        queryKey: ['fetchFreemiumWeather', zipCode],
        queryFn: () => fetchFreemiumWeather(zipCode as string),
        enabled: showFreemium,
    });

    if (error || freemiumError) navigate('/error');

    useScrollToTop();
    const combinedLoaderFlags = isLoading || freemiumIsLoading;

    return (
        <>
            <ResultsSection data-test-id='ResultPage_ResultsSection'>
                <ZipCodeTitle data-test-id='ResultPage_ZipCodeTitle'>Weather Results for {zipCode}</ZipCodeTitle>
                {combinedLoaderFlags && (
                    <div>
                        <Loader />
                    </div>
                )}
                {!freemiumIsLoading && (
                    <>{showFreemium && <FreemiumResults data={freemiumData as unknown as FreemiumWeatherItem} />}</>
                )}

                {!isLoading && <>{showPremium && <PremiumResults data={premiumData as PremiumWeatherItem} />}</>}
                <ZipCodeForm
                    data-test-id='ResultPage_ZipCodeForm'
                    placeHolderText={'Search Again!'}
                    setZipCode={setZipCode}
                />
            </ResultsSection>
        </>
    );
};

export default ResultPage;
