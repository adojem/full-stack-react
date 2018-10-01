import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import template from '../template';

// comment out before building for production
import devBundle from './devBundle';

const app = express();

// comment out before building for production
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => res.status(200).send(template()));

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
   if (err) {
      return console.log(err);
   }
   return console.info('Server started on port %s.', port);
});

// Database Connection URL
const url = process.env.MONGODB_URI || 'mongodb:localhost:27017/mernMerketplace';
MongoClient.connect(
   url,
   (err, db) => {
      if (err) {
         return console.log(err);
      }
      console.log('Connected successfully to mongodb server');
      db.close();
   },
);
