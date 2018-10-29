import mongoose from 'mongoose';
import config from '../config/config';
import app from './express';
import template from '../template';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri);

mongoose.connection.on('error', () => {
   throw new Error(`unable to connect to databse: ${config.mongoUri}`);
});

app.get('/', (req, res) => res.status(200).send(template()));

app.listen(config.port, (err) => {
   if (err) {
      console.log(err);
   }
   console.info('Server started on port %s.', config.port);
});
