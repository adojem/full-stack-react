import { MongoClient } from 'mongodb';
import config from '../config/config';
import app from './express';

app.listen(config.port, (err) => {
   if (err) {
      return console.log(err);
   }
   return console.info('Server started on port %s.', config.port);
});

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernMerketplace';
MongoClient.connect(
   url,
   (err, db) => {
      if (err) {
         return console.log(err);
      }
      console.log('Connected successfully to mongodb server');
      return db.close();
   },
);
