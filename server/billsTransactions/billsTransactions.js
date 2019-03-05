const mongoose = require('mongoose');

const billTransactionModel = require('./billTransactionModel');
const billModel = require('../bills/billModel');

module.exports = class BillsTransactions {
  async addBillTransaction(inBillTransaction) {
    let bill = await billModel.findById(inBillTransaction.bill_id);
    if(bill === null) {
      throw new Error(`Invalid bill id`);
    }
    inBillTransaction.bill_name = bill.name;
    inBillTransaction.bill_frequency = bill.frequency;
    inBillTransaction.bill_currency = bill.currency;
    let billTransaction = new billTransactionModel(inBillTransaction);
    return await billTransaction.save();
  }
}
