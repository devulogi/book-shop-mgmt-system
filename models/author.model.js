var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  name: {
    type: String,
  },
  description: String,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  created_at: { type: Date, default: Date.now },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_at: { type: Date, default: Date.now },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Author', AuthorSchema);
