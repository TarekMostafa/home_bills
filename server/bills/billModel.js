const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['None', 'Daily', 'Weekly', 'Monthly',
          'Bi-Monthly', 'Quarterly', '3 Per Annum',
          'Semi-Annual','Annual']
  },
  startDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Closed']
  },
  currency: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3
  },
  defaultAmount: {
    type: Number,
    default: 0
  },
  lastPaidDate: {
    type: Date,
    default: 0
  },
  itemsRequired: {
    type: Boolean,
    default: false
  },
  items: {
    type: [String]
  }
});

module.exports = mongoose.model('bills', billSchema);
