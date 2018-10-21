import mongoose from 'mongoose';
import Grid from 'gridfs-stream';

Grid.mongo = mongoose.mongo;
let gridfs = null;
mongoose.connection.on('connected', () => {
   gridfs = Grid(mongoose.connection.db);
});
