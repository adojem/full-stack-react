import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader';
import MainRouter from './MainRouter';

// Create a theme instance
const theme = createMuiTheme({
   palette: {
      primary: {
         light: '#484848',
         main: '#212121',
         dark: '#000',
         contrastText: '#fff',
      },
      secondary: {
         light: '#ffff6e',
         main: '#cddc39',
         dark: '#99aa00',
         contrastText: '#000',
      },
      openTitle: '#484848',
      protectedTitle: '#7da453',
      type: 'light',
   },
   typography: {
      useNextVariants: true,
   },
});

const App = () => (
   <BrowserRouter>
      <MuiThemeProvider theme={theme}>
         <MainRouter />
      </MuiThemeProvider>
   </BrowserRouter>
);

export default hot(module)(App);
