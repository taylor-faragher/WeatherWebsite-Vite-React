import {Routes, Route, Navigate} from 'react-router-dom';
import {ErrorPage, HomePage, ResultPage} from './pages';
import {Header} from './pages/shared/Header';
import './AppRoutes.css';
import {ThemeProvider, styled} from 'styled-components';
import {GlobalStyles} from './GlobalStyles';
import {darkTheme, lightTheme} from './Theme';
import {useDarkMode} from './pages/shared/useDarkMode';

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
            <AppWrapper data-test-id='AppWrapper'>
                <Header theme={theme} themeSwitch={themeToggler}></Header>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='main' element={<HomePage />} />
                    <Route path='result' element={<ResultPage />} />
                    <Route path='/info' element={<Navigate to='/main' replace />} />
                    <Route path='error' element={<ErrorPage />} />
                    <Route path='*' element={<HomePage />} />
                </Routes>
            </AppWrapper>
        </ThemeProvider>
    );
};

export default AppRoutes;
