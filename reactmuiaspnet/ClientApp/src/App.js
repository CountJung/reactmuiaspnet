//import React, { Component } from 'react';
//import { Route, Routes } from 'react-router-dom';
//import AppRoutes from './AppRoutes';
//import { Layout } from './components/Layout';
//import './custom.css';

//export default class App extends Component {
//  static displayName = App.name;

//  render() {
//    return (
//      <Layout>
//        <Routes>
//          {AppRoutes.map((route, index) => {
//            const { element, ...rest } = route;
//            return <Route key={index} {...rest} element={element} />;
//          })}
//        </Routes>
//      </Layout>
//    );
//  }
//}

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Route, Routes } from 'react-router';
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { ChartJSTestPage } from './components/Home';
import { amber, deepOrange, orange, grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Container, Grid } from '@mui/material';
import { Budget } from './components/budget';
import { TrafficByDevice } from './components/TrafficDevice';
import { ProductPage } from './Pages/Products';
import ImageGallery from './Pages/ImageGallery';

const drawerWidth = 200;
const navItems = ['Home', 'counter', 'fetchData', 'swagger'];

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        //primary: {
        //    ...amber,
        //    ...(mode === 'dark' && {
        //        main: amber[300],
        //    }),
        //},
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        ...(mode === 'dark' ? {
            background: {
                /* default: deepOrange[900],*/
                /*paper: deepOrange[900],*/
            },
        } : {
            background: {
                /* default: deepOrange[900],*/
                /*paper: deepOrange[900],*/
            },
        }),
        text: {
            ...(mode === 'light'
                ? {
                    primary: grey[900],
                    secondary: grey[800],
                }
                : {
                    primary: '#fff',
                    secondary: deepOrange[500],
                }),
        },
        status: {
            danger: orange[500],
        },
    },
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function DrawerLeft(props) {
    const { window } = props;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState('light');

    const toggleThemeMode = () => {
        setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
    }
    const modeTheme = createTheme(getDesignTokens(mode));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {['ChartJSTestPage', 'counter', 'fetchdata', 'ProductPage', 'ImageGallery'].map((text, index) => (
                    <ListItem key={text} component="a" href={"/" + text} sx={{ textAlign: 'center' }} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={modeTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        > 
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" >
                            drawer
                        </Typography>
                        <IconButton sx={{ mx: 1 }} onClick={toggleThemeMode} color="inherit">
                            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        variant="persistent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open={open} anchor="left"
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </DrawerHeader>
                        {drawer}
                    </Drawer>
                </Box>
                {/*<Box*/}
                {/*    component="main"*/}
                {/*    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}*/}
                {/*>*/}
                {/*</Box>*/}
                <Main open={open}>
                    <Container maxWidth={false}>
                        <Stack spacing={5} direction='column'>
                            <toolbar />
                            <Routes>
                                <Route path='/' element={<ChartJSTestPage />} />
                                <Route path='/ChartJSTestPage' element={<ChartJSTestPage />} />
                                <Route path='/counter' element={<Counter />} />
                                <Route path='/fetchdata' element={<FetchData />} />
                                <Route path='/ProductPage' element={<ProductPage />} />
                                <Route path='/ImageGallery' element={<ImageGallery />} />
                            </Routes>
                            <Grid container spacing={2} justifyContent="center" alignItems="center" >
                                {/*xs: Column widths are integer values between 1 and 12;*/}
                                {/*md (12 by default), 'auto', bool */}
                                {/*<Grid item lg={3} sm={6} xl={3} xs={12} >*/}
                                {/*    <Stack direction="row" spacing={2}>*/}
                                {/*        <Button variant="contained">Contained</Button>*/}
                                {/*        <Button variant="contained" disabled>*/}
                                {/*            Disabled*/}
                                {/*        </Button>*/}
                                {/*        <Button variant="contained" href="#contained-buttons">*/}
                                {/*            Link*/}
                                {/*        </Button>*/}
                                {/*    </Stack>*/}
                                {/*</Grid>*/}
                                <Grid item lg={3} sm={6} xl={3} xs={12} >
                                    <Budget />
                                </Grid>
                                <Grid item lg={3} sm={6} xl={3} xs={12} >
                                    <TrafficByDevice />
                                </Grid>
                                <Grid item lg={3} sm={6} xl={3} xs={12} >
                                    <Typography paragraph >
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                                        sapien faucibus et molestie ac.
                                    </Typography>
                                </Grid>
                                <Grid item lg={3} sm={6} xl={3} xs={12} >
                                    <Typography paragraph>
                                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                                        posuere sollicitudin aliquam ultrices sagittis orci a.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                        {/*<Grid container spacing={5} direction="column">*/}
                        {/*    <Grid item lg={'auto'} sm={'auto'} xl={'auto'} xs={'auto'}>*/}
                        {/*    </Grid>*/}
                        {/*    <Grid item lg={'auto'} sm={'auto'} xl={'auto'} xs={'auto'}>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </Container>
                </Main>
            </Box>
        </ThemeProvider>
    );
}
