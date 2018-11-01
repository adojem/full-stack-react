import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
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

// Catch unauthorized errors
app.use((err, req, res, next) => {
   if (err.name === 'UnauthorizedError') {
      res.status(401).json({
         error: `${err.name}: ${err.message}`,
      });
   }
});

export default app;
