import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import template from '../template';
import devBundle from './devBundle';

const app = express();
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res) => {
   res.status(200).send(template());
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
   if (err) {
      return console.lot(err);
   }
   return console.info('Server started on port %s.', port);
});

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';
MongoClient.connect(
   url,
   { useNewUrlParser: true },
   (err, db) => {
      console.log('Connected successfully to mongodb server');
      db.close();
   },
);
