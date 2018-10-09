import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

// modules for server side rendering
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
import { indigo, pink } from '@material-ui/core/colors';

// client side route
import MainRouter from '../client/MainRouter';
// server side routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import shopRoutes from './routes/shop.routes';
import productRoutes from './routes/product.routes';

import Template from '../template';

// comment out before building for production
import devBundle from './devBundle';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// comment out before building for production
devBundle.compile(app);

// parse boyd params and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Corss Origin Resource Sharing
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', productRoutes);

app.get('*', (req, res) => {
   const sheetsRegistry = new SheetsRegistry();
   const theme = createMuiTheme({
      palette: {
         primary: {
            light: '#8eacbb',
            main: '#607d8b',
            dark: '#34515e',
            contrastText: '#fff',
         },
         secondary: {
            light: '#e7ff8c',
            main: '#b2ff59',
            dark: '#7ecb20',
            contrastText: '#000',
         },
      },
      openTitle: indigo['400'],
      protectedTitle: pink['400'],
      type: 'light',
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
      Template({
         markup,
         css,
      }),
   );
});

// Catch unauthorized errors
app.use((err, req, res, next) => {
   if (err.name === 'UnauthorizedError') {
      res.status(401).json({ error: `${err.name}: ${err.message}` });
   }
});

export default app;
