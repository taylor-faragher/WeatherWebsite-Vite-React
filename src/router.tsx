import {Routes, Route} from 'react-router-dom';
import {ErrorPage, HomePage, ResultPage} from './pages';
import {Header} from './pages/shared/Header';
import './AppRoutes.css';
import {styled} from 'styled-components';

const AppWrapper = styled.div`
    width: 100vw;
`;

const AppRoutes = () => {
    return (
        <AppWrapper data-test-id='AppWrapper'>
            <Header></Header>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='main' element={<HomePage />} />
                <Route path='result' element={<ResultPage />} />
                <Route path='error' element={<ErrorPage />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
        </AppWrapper>
    );
};

export default AppRoutes;
