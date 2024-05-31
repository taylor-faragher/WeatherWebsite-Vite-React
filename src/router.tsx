import {Routes, Route, Navigate} from 'react-router-dom';
import {ErrorPage, HomePage, ResultPage, SignUpPage} from './pages';
import {Header} from './pages/shared/Header';
import './AppRoutes.css';
import {ThemeProvider, styled} from 'styled-components';
import {GlobalStyles} from './GlobalStyles';
import {darkTheme, lightTheme} from './Theme';
import {useDarkMode} from './hooks/useDarkMode';
import LoginPage from './pages/login/LoginPage';
import {AccountPage} from './pages/account/AccountPage';
import Status from './pages/status/Status';

const AppWrapper = styled.div`
    width: 100vw;
`;

const AppRoutes = () => {
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!mountedComponent) return <div />;
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <AccountPage>
                <Status />
                <AppWrapper data-test-id='AppWrapper'>
                    <Header theme={theme} themeSwitch={themeToggler}></Header>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='main' element={<HomePage />} />
                        <Route path='result' element={<ResultPage />} />
                        <Route path='info' element={<Navigate to='/main' replace />} />
                        <Route path='signup' element={<SignUpPage />} />
                        <Route path='login' element={<LoginPage />} />
                        <Route path='error' element={<ErrorPage />} />
                        <Route path='*' element={<HomePage />} />
                    </Routes>
                </AppWrapper>
            </AccountPage>
        </ThemeProvider>
    );
};

export default AppRoutes;
