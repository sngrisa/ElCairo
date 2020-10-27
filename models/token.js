const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Schema OF Tooken
const TokenSchema = new Schema({
    //save the Id of User
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200 
  },
});

modoule.exports = mongoose.model("Token", TokenSchema);

