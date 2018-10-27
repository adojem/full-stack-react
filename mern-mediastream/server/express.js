import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

// modules for server rside rendering
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
import { red, brown } from '@material-ui/core/colors';

import { matchRoutes } from 'react-router-config'; // For SSR
import MainRouter from '../client/MainRouter';
// end

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import mediaRoutes from './routes/media.routes';
import template from '../template';

// For SSR wwith data
import routes from '../client/routeConfig';
import 'isomorphic-fetch';

// comment out before building for production
import devBundle from './devBundle';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// comment out before building for production
devBundle.compile(app);

// For SSR with data
const loadBranchData = (location) => {
   const branch = matchRoutes(routes, location);
   // console.log('branch', branch);
   const promises = branch.map(
      ({ route, match }) =>
         (route.loadData ? route.loadData(branch[0].match.params) : Promise.resolve(null)),
   );

   return Promise.all(promises);
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', mediaRoutes);

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('*', (req, res) => {
   const sheetsRegistry = new SheetsRegistry();
   const theme = createMuiTheme({
      typography: {
         useNextVariants: true,
      },
      palette: {
         primary: {
            light: '#f05545',
            main: '#b71c1c',
            dark: '#7f0000',
            contrastText: '#fff',
         },
         secondary: {
            light: '#fbfffc',
            main: '#c8e6c9',
            dark: '#97b498',
            contrastText: '#37474f',
         },
         openTitle: red['500'],
         protectedTitle: brown['300'],
         type: 'light',
      },
   });
   const generateClassName = createGenerateClassName();
   const context = {};

   loadBranchData(req.url)
      .then((data) => {
         const markup = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
               <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                  <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                     <MainRouter data={data} />
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
      })
      .catch(err => res.status(500).send({ error: 'Could not load React view with data' }));
});

// Catch unauthorized errors
app.use((err, req, res, next) => {
   if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: `${err.name}: ${err.message}` });
   }
});

export default app;
