var mongoose = require('mongoose');

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
  lastBillPaidDate: {
    type: Date,
    default: 0
  },
  detailIsRequired: {
    type: Boolean,
    default: false
  },
  items: {
    type: [String]
  }
});
const Bill = mongoose.model('bills', billSchema);

module.exports = class Bills {
  async addBill(inBill){
    let bill = new Bill(inBill);
    await bill.save();
    return;
  }

  editBill(){

  }

  async getBills(){
    return await Bill.find({});
  }

  deleteBill(){

  }
}
