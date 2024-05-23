import {Routes, Route} from 'react-router-dom';
import {ErrorPage, HomePage, ResultPage} from './pages';
import {Header} from './pages/shared/Header';

const AppRoutes = () => {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='main' element={<HomePage />} />
                <Route path='result' element={<ResultPage />} />
                <Route path='error' element={<ErrorPage />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
