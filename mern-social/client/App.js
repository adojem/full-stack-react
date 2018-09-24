import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { teal, orange } from '@material-ui/core/colors';
import { hot } from 'react-hot-loader';
import MainRouter from './MainRouter';

const theme = createMuiTheme({
   palatte: {
      primary: {
         light: '#52c7b8',
         main: '#009688',
         dark: '#00675b',
         contrastText: '#fff',
      },
      secondary: {
         light: '#ffd95b',
         main: '#ffa726',
         dark: '#c77800',
         contrastText: '#000',
      },
      openTitle: teal['700'],
      protetedTitle: orange['700'],
      type: 'light',
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