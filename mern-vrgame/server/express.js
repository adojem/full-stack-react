import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
// module for server side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
   MuiThemeProvider,
   createMuiTheme,
   createGenerateClassName,
} from '@material-ui/core/styles';
import MainRouter from '../client/MainRouter';
// end

import template from '../template';
import userRutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

// comment out before building for production
import devBundle from './devBundle';

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// comment out before building for production
devBundle.compile(app);

// parse ody params and attachh them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// mount routes
app.use('/', userRutes);
app.use('/', authRoutes);

// app.get('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req, res) => {
   const sheetsRegistry = new SheetsRegistry();
   const theme = createMuiTheme({
      typography: {
         useNextVariants: true,
      },
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
   });
   const generateClassName = createGenerateClassName();
   const context = {};
   const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
         <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
               <MainRouter />
            </MuiThemeProvider>
         </JssProvider>
      </StaticRouter>,
   );
   if (context.url) {
      return res.redirect(303, context.url);
   }
   const css = sheetsRegistry.toString();
   return res.status(200).send(
      template({
         markup,
         css,
      }),
   );
});

// Catch unauthorized errors
app.use((err, req, res, next) => {
   if (err.name === 'UnauthorizedError') {
      res.status(401).json({
         error: `${err.name}: ${err.message}`,
      });
   }
});

export default app;
