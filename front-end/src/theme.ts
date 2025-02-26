import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: 'rgba(128,255,216,0.73)',
        },
        background: {
            default: '#f4f4f4',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontWeight: 500,
        },
        h2: {
            fontWeight: 500,
        },
    },
});

export default theme;
