let mongoose = require('mongoose')
var SchemaTypes = mongoose.Schema.Types;

mongoose.connect('mongodb://localhost:27017/test');

let PostSchema = new mongoose.Schema({
  title: String,
  text: {
    type: String,
    required: true,
  },
  likes: { type: Number, default: 0, required: true },
  shares: { type: Number, default: 0, required: true },
  comments: { type: Number, default: 0, required: true },
  views: { type: Number, default: 0, required: true },
  zscore: { type: Number, default: 0, required: true }
},{
  timestamps: true // to create automatic timestamp of createdAt and last updated at 
})

module.exports = mongoose.model('Post', PostSchema)
