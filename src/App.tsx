import styled, {ThemeProvider} from 'styled-components';
import AppRoutes from './router';
import {GlobalStyles} from './GlobalStyles';
import {Account} from './services/Account';
import {darkTheme, lightTheme} from './Theme';
import {Header} from './pages/shared/Header';
import {useDarkMode} from './hooks/useDarkMode';

const AppWrapper = styled.div`
    width: 100vw;
`;

export const App = () => {
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    if (!mountedComponent) return <div />;
    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <Account>
                <AppWrapper data-test-id='AppWrapper'>
                    <Header theme={theme} themeSwitch={themeToggler}></Header>
                    <AppRoutes />
                </AppWrapper>
            </Account>
        </ThemeProvider>
    );
};

export default App;
