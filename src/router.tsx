import {Routes, Route, Navigate} from 'react-router-dom';
import {ErrorPage, HomePage, ResultPage, ProfilePage} from './pages';
import './AppRoutes.css';
import LoginPage from './pages/login/LoginPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='main' element={<HomePage />} />
            <Route path='result' element={<ResultPage />} />
            <Route path='info' element={<Navigate to='/main' replace />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='error' element={<ErrorPage />} />
            <Route path='*' element={<HomePage />} />
        </Routes>
    );
};

export default AppRoutes;
