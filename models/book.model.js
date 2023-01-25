var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  author: [{
    type: String,
    required: true
  }],
  isbn: String,
  published: {
    type: Date,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  quantity: Number,
  price: Number,
  category: String,
  image: String,
  rating: Number,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  created_at: { type: Date, default: Date.now },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_at: { type: Date, default: Date.now },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Book', BookSchema);
