import styled, {ThemeProvider} from 'styled-components';
import AppRoutes from './router';
import {GlobalStyles} from './GlobalStyles';
import {AccountProvider} from './services/AccountProvider';
import {darkTheme, lightTheme} from './Theme';
import {Header} from './pages/shared/Header/Header';
import {useDarkMode} from './hooks/useDarkMode';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NotificationProvider} from './services/NotificationProvider';
import Notification from './pages/shared/Notifications/Notification';

const AppWrapper = styled.div`
    width: 100vw;
`;

const queryClient = new QueryClient();

export const App = () => {
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    if (!mountedComponent) return <div />;

    return (
        <ThemeProvider theme={themeMode}>
            <QueryClientProvider client={queryClient}>
                <GlobalStyles />
                <NotificationProvider>
                    <AccountProvider>
                        <AppWrapper data-test-id='AppWrapper'>
                            <Header data-test-id='Header' theme={theme} themeSwitch={themeToggler}></Header>
                            <Notification></Notification>
                            <AppRoutes />
                        </AppWrapper>
                    </AccountProvider>
                </NotificationProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default App;
