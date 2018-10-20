import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, brown } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainRouter from './MainRouter';

const theme = createMuiTheme({
   palette: {
      primary: {
         light: '#f05545',
         main: '#b71c1c',
         dark: '#7f0000',
         contrastText: '#fff',
      },
      secondary: {
         light: '#efdcd5',
         main: '#d7ccc8',
         dark: '#8c7b75',
         contrastText: '#424242',
      },
      openTitle: red['500'],
      protectedTitle: brown['300'],
      type: 'light',
   },
   typography: {
      useNextVariants: true,
   },
});

const App = () => (
   <BrowserRouter>
      <MuiThemeProvider theme={theme}>
         <CssBaseline />
         <MainRouter />
      </MuiThemeProvider>
   </BrowserRouter>
);

export default hot(module)(App);
