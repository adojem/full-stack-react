import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: 'Name is required',
   },
   image: {
      type: Buffer,
      contentType: String,
   },
   description: {
      type: String,
      trim: true,
   },
   category: {
      type: String,
   },
   quantity: {
      type: Number,
      required: 'Quantity is required',
   },
   price: {
      type: Number,
      required: 'Price is required',
   },
   updaated: Date,
   created: {
      type: Date,
      default: Date.now,
   },
   shop: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shop',
   },
});

export default mongoose.model('Product', ProductSchema);
