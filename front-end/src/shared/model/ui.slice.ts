import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

type UiState = {
    drawerOpen: boolean;
    themeMode: ThemeMode;
};

const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem('themeMode');
    return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light';
};

const initialState: UiState = {
    drawerOpen: false,
    themeMode: getInitialTheme(),
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleDrawer(state) {
            state.drawerOpen = !state.drawerOpen;
        },
        setDrawer(state, action: PayloadAction<boolean>) {
            state.drawerOpen = action.payload;
        },
        toggleTheme(state) {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', state.themeMode);
        },
        setTheme(state, action: PayloadAction<ThemeMode>) {
            state.themeMode = action.payload;
            localStorage.setItem('themeMode', action.payload);
        },
    },
});

export const { toggleDrawer, setDrawer, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;

