const mongoose = require('mongoose');
const _ = require('lodash');

const billModel = require('./billModel');
const billTransactionModel = require('../billsTransactions/billTransactionModel');

module.exports = class Bill {
  async addBill(inBill){
    let bill = new billModel(inBill);
    return await bill.save();
  }

  async updateBill(id, inBill){
    let bill = await billModel.findById(id);
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
    return await billModel.find(query);
  }

  async getBill(id){
    return await billModel.findById(id);
  }

  async deleteBill(id){
    const counter = await billTransactionModel.countDocuments({bill_id:id});
    if(counter > 0){
      throw new Error(`you cant delete this bill because it has ${counter} transaction(s)`);
    }
    let bill = await billModel.findById(id);
    return await bill.delete();
  }
}
