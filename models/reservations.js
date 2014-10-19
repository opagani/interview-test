var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  first_name:  String,
  last_name: String,
  date: String,
  time: String,
  party_size: { type: Number, min: 1, max: 20 },
  comments: String
});
