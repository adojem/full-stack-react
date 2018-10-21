import mongoose from 'mongoose';
import config from '../config/config';
import app from './express';

// Connection URL
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true).connect(
   config.mongoUri,
   { useNewUrlParser: true },
);
mongoose.connection.on('error', () => {
   throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
   if (err) {
      console.log(err);
   }
   console.info('Server started on port %s.', config.port);
});
