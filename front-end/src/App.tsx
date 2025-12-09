import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    useTheme,
    useMediaQuery,
    Divider,
    ListItemIcon,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
    Inventory2Outlined as ProductsIcon,
    CategoryOutlined as CategoriesIcon,
    ShoppingCartOutlined as OrdersIcon,
    DashboardOutlined as DashboardIcon,
    GitHub as GitHubIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import DashboardPage from './pages/DashboardPage';
import { useAppDispatch, useAppSelector } from './shared/lib/hooks';
import { toggleDrawer as toggleDrawerAction, setDrawer, toggleTheme } from './shared/model/ui.slice';

const App = () => {

    const dispatch = useAppDispatch();

    const drawerOpen = useAppSelector((state) => state.ui.drawerOpen);
    const themeMode = useAppSelector((state) => state.ui.themeMode);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleToggleDrawer = () => {
        dispatch(toggleDrawerAction());
    };

    const handleCloseDrawer = () => {
        dispatch(setDrawer(false));
    };

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    const menuItems = [
        { label: 'Products', path: '/', icon: <ProductsIcon /> },
        { label: 'Categories', path: '/categories', icon: <CategoriesIcon /> },
        { label: 'Orders', path: '/orders', icon: <OrdersIcon /> },
        { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    ];

    return (
        <Router>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                }}
            >
                <AppBar 
                    position="sticky" 
                    elevation={0}
                    sx={{
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Toolbar>
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleToggleDrawer}
                                sx={{ mr: 2, color: 'text.primary' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                flexGrow: 1,
                                fontWeight: 700,
                                color: 'text.primary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <DashboardIcon sx={{ fontSize: 28 }} />
                            NSLT Challenge
                        </Typography>

                        <IconButton 
                            onClick={handleToggleTheme} 
                            color="inherit"
                            sx={{ 
                                mr: 1,
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                        </IconButton>

                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {menuItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        component={Link}
                                        to={item.path}
                                        startIcon={item.icon}
                                        sx={{
                                            color: 'text.primary',
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleCloseDrawer}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <Box
                        sx={{
                            width: 280,
                            height: '100%',
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                Menu
                            </Typography>
                        </Box>
                        <Divider />
                        <List>
                            {menuItems.map((item) => (
                                <ListItem
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    onClick={handleCloseDrawer}
                                    sx={{
                                        color: 'text.primary',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>

                <Container 
                    maxWidth="xl" 
                    sx={{ 
                        py: { xs: 2, sm: 3, md: 4 }, 
                        flexGrow: 1,
                        px: { xs: 2, sm: 3 },
                    }}
                >
                    <main>
                        <Routes>
                            <Route path="/" element={<ProductsPage />} />
                            <Route path="/categories" element={<CategoriesPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                        </Routes>
                    </main>
                </Container>

                <Box
                    component="footer"
                    sx={{
                        py: 2,
                        px: 2,
                        mt: 'auto',
                        borderTop: `1px solid ${theme.palette.divider}`,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Container maxWidth="xl">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    color: 'text.secondary',
                                    textAlign: { xs: 'center', sm: 'left' },
                                }}
                            >
                                © 2024 NSLT Challenge. All rights reserved.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <IconButton
                                    component="a"
                                    href="https://github.com/Vidigal-code/nslt-challenge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: 'text.primary',
                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    <GitHubIcon />
                                </IconButton>
                                <Typography 
                                    variant="body2" 
                                    component="a"
                                    href="https://github.com/Vidigal-code/nslt-challenge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        color: 'text.secondary',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: 'primary.main',
                                        },
                                    }}
                                >
                                    Vidigal-Code
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
