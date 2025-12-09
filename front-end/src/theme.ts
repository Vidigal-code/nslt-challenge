import { createTheme, Theme } from '@mui/material/styles';

export const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#666666',
        },
        error: {
            main: '#d32f2f',
        },
        success: {
            main: '#2e7d32',
        },
        warning: {
            main: '#ed6c02',
        },
        info: {
            main: '#0288d1',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(0,0,0,0.05)',
        '0px 4px 8px rgba(0,0,0,0.08)',
        '0px 6px 12px rgba(0,0,0,0.1)',
        '0px 8px 16px rgba(0,0,0,0.12)',
        '0px 10px 20px rgba(0,0,0,0.15)',
        '0px 12px 24px rgba(0,0,0,0.18)',
        '0px 14px 28px rgba(0,0,0,0.2)',
        '0px 16px 32px rgba(0,0,0,0.22)',
        '0px 18px 36px rgba(0,0,0,0.24)',
        '0px 20px 40px rgba(0,0,0,0.26)',
        '0px 22px 44px rgba(0,0,0,0.28)',
        '0px 24px 48px rgba(0,0,0,0.3)',
        '0px 26px 52px rgba(0,0,0,0.32)',
        '0px 28px 56px rgba(0,0,0,0.34)',
        '0px 30px 60px rgba(0,0,0,0.36)',
        '0px 32px 64px rgba(0,0,0,0.38)',
        '0px 34px 68px rgba(0,0,0,0.4)',
        '0px 36px 72px rgba(0,0,0,0.42)',
        '0px 38px 76px rgba(0,0,0,0.44)',
        '0px 40px 80px rgba(0,0,0,0.46)',
        '0px 42px 84px rgba(0,0,0,0.48)',
        '0px 44px 88px rgba(0,0,0,0.5)',
        '0px 46px 92px rgba(0,0,0,0.52)',
        '0px 48px 96px rgba(0,0,0,0.54)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontSize: '0.95rem',
                },
                contained: {
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': {
                        boxShadow: '0px 6px 16px rgba(0,0,0,0.2)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

export const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            light: '#bbdefb',
            dark: '#42a5f5',
            contrastText: '#000000',
        },
        secondary: {
            main: '#ce93d8',
            light: '#f3e5f5',
            dark: '#ab47bc',
            contrastText: '#000000',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
        error: {
            main: '#f44336',
        },
        success: {
            main: '#66bb6a',
        },
        warning: {
            main: '#ffa726',
        },
        info: {
            main: '#29b6f6',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
            fontSize: '2.5rem',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0px 2px 4px rgba(0,0,0,0.3)',
        '0px 4px 8px rgba(0,0,0,0.35)',
        '0px 6px 12px rgba(0,0,0,0.4)',
        '0px 8px 16px rgba(0,0,0,0.45)',
        '0px 10px 20px rgba(0,0,0,0.5)',
        '0px 12px 24px rgba(0,0,0,0.55)',
        '0px 14px 28px rgba(0,0,0,0.6)',
        '0px 16px 32px rgba(0,0,0,0.65)',
        '0px 18px 36px rgba(0,0,0,0.7)',
        '0px 20px 40px rgba(0,0,0,0.75)',
        '0px 22px 44px rgba(0,0,0,0.8)',
        '0px 24px 48px rgba(0,0,0,0.85)',
        '0px 26px 52px rgba(0,0,0,0.9)',
        '0px 28px 56px rgba(0,0,0,0.95)',
        '0px 30px 60px rgba(0,0,0,1)',
        '0px 32px 64px rgba(0,0,0,1)',
        '0px 34px 68px rgba(0,0,0,1)',
        '0px 36px 72px rgba(0,0,0,1)',
        '0px 38px 76px rgba(0,0,0,1)',
        '0px 40px 80px rgba(0,0,0,1)',
        '0px 42px 84px rgba(0,0,0,1)',
        '0px 44px 88px rgba(0,0,0,1)',
        '0px 46px 92px rgba(0,0,0,1)',
        '0px 48px 96px rgba(0,0,0,1)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '8px 20px',
                    fontSize: '0.95rem',
                },
                contained: {
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.5)',
                    '&:hover': {
                        boxShadow: '0px 6px 16px rgba(0,0,0,0.6)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 4px 16px rgba(0,0,0,0.5)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundImage: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export const getTheme = (mode: 'light' | 'dark'): Theme => {
    return mode === 'light' ? lightTheme : darkTheme;
};

export default lightTheme;
