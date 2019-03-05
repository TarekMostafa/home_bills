const mongoose = require('mongoose');

const billTransactionSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  transDate: {
    type: Date,
    required: true
  },
  transPostingDate: {
    type: Date,
    required: true
  },
  isOutOfFrequency: {
    type: Boolean,
    required: true
  },
  notes: {
    type: String
  },
  bill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bills',
    required: true
  },
  bill_name: {
    type: String
  },
  bill_frequency: {
    type: String
  },
  bill_currency: {
    type: String
  }
});

module.exports = mongoose.model('billsTransactions', billTransactionSchema);
