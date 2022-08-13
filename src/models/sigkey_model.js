var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SigkeySchema = new Schema(
  {
    userid: {
      type: String,
    },
    publicKey: {
      type: String,
    },
    secretKey: {
      type: String,
    },
    algorithm: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { usePushEach: true },
);

module.exports = mongoose.model('Sigkey', SigkeySchema);
