import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
} from '@mui/material';
import {Link} from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import DashboardPage from "./pages/DashboardPage";

const App = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Router>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                <header>
                    <AppBar position="sticky">
                        <Toolbar>
                            <Typography variant="h6" sx={{flexGrow: 1}}>
                                Nouslatam Front-End
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={toggleDrawer}
                                sx={{display: {xs: 'block', sm: 'none'}}}
                            >
                                Menu
                            </Button>

                            <Box sx={{display: {xs: 'none', sm: 'flex'}, gap: 2}}>
                                <Button color="inherit" component={Link} to="/">
                                    Products
                                </Button>
                                <Button color="inherit" component={Link} to="/categories">
                                    Categories
                                </Button>
                                <Button color="inherit" component={Link} to="/orders">
                                    Orders
                                </Button>
                                <Button color="inherit" component={Link} to="/dashboard">
                                    Dashboard
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </header>

                <nav>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer}
                        sx={{
                            display: {xs: 'block', sm: 'none'},
                        }}
                    >
                        <List sx={{
                            backgroundColor: 'black',
                            height: '100%',
                        }}
                        >
                            <ListItem component={Link} to="/">
                                <ListItemText sx={{
                                    color: 'white',
                                }} primary="Products"/>
                            </ListItem>
                            <ListItem component={Link} to="/categories">
                                <ListItemText sx={{
                                    color: 'white',
                                }} primary="Categories"/>
                            </ListItem>
                            <ListItem component={Link} to="/orders">
                                <ListItemText sx={{
                                    color: 'white',
                                }} primary="Orders"/>
                            </ListItem>
                            <ListItem component={Link} to="/dashboard">
                                <ListItemText sx={{
                                    color: 'white',
                                }} primary="Dashboard"/>
                            </ListItem>
                        </List>
                    </Drawer>
                </nav>

                <Container sx={{py: 2, flexGrow: 1}}>
                    <main>
                        <Routes>
                            <Route path="/" element={<ProductsPage/>}/>
                            <Route path="/dashboard" element={<DashboardPage/>}/>
                            <Route path="/categories" element={<CategoriesPage/>}/>
                            <Route path="/orders" element={<OrdersPage/>}/>
                        </Routes>
                    </main>
                </Container>
                <footer>
                    <AppBar position="sticky">
                        <Toolbar>
                            <Typography variant="h6" sx={{flexGrow: 1}}>
                                Vidigal-Code
                            </Typography>
                            <Button
                                color="inherit"
                                onClick={toggleDrawer}
                                sx={{display: {xs: 'block', sm: 'none'}}}
                            >
                                Menu
                            </Button>

                            <Box sx={{display: {xs: 'none', sm: 'flex'}, gap: 2}}>
                                <Button color="inherit" component={Link} to="/">
                                    Products
                                </Button>
                                <Button color="inherit" component={Link} to="/categories">
                                    Categories
                                </Button>
                                <Button color="inherit" component={Link} to="/orders">
                                    Orders
                                </Button>
                                <Button color="inherit" component={Link} to="/dashboard">
                                    Dashboard
                                </Button>
                            </Box>
                        </Toolbar>
                    </AppBar>

                </footer>

            </div>
        </Router>
    );
};

export default App;
