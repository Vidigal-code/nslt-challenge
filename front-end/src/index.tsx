import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import { AppProviders } from './app/providers';
import { useAppSelector } from './shared/lib/hooks';

const ThemedApp = () => {

    const themeMode = useAppSelector((state) => state.ui.themeMode);

    const theme = getTheme(themeMode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <AppProviders>
        <ThemedApp />
    </AppProviders>
);
