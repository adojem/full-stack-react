import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from '../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

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

app.get('/', (req, res) => res.status(200).send(Template()));

export default app;
