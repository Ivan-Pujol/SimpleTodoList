const mongoose = require('mongoose');
//const transactionId = require('mongodb').ObjectID;
const Schema = mongoose.Schema;
let schema = mongoose.Schema({
  action: {
    type: String,
  },
  done: {
    type: Boolean,
  },
  created: {
    type: String,
  },
});
const ToDoActionModel = mongoose.model('ToDoList', schema);
module.exports = ToDoActionModel;