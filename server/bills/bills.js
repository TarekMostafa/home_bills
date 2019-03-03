var mongoose = require('mongoose');
var _ = require('lodash');

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
const Bill = mongoose.model('bills', billSchema);

module.exports = class Bills {
  async addBill(inBill){
    let bill = new Bill(inBill);
    return await bill.save();
  }

  async updateBill(id, inBill){
    let bill = await Bill.findById(id);
    bill.status = inBill.status;
    bill.defaultAmount = inBill.defaultAmount;
    bill.startDate = inBill.startDate;
    bill.itemsRequired = inBill.itemsRequired;
    bill.items = inBill.items;
    return await bill.save();
  }

  async getBills(search){
    let query = {};
    if(!_.isNil(search)){
      if(!_.isNil(search.status) && search.status !== ''){
        query.status = search.status;
      }
    }
    return await Bill.find(query);
  }

  async getBill(id){
    return await Bill.findById(id);
  }

  async deleteBill(id){
    let bill = await Bill.findById(id);
    return await bill.delete();
  }
}
