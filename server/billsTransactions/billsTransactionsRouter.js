const express = require('express');
const billsTransactions = require('./billsTransactions');

const router = express.Router();
const billTransaction = new billsTransactions();

router.post('/', function(req, res, next){
  billTransaction.addBillTransaction(req.body).then( () => {
    res.status(200).send('Bill Transaction has been added successfully');
  }).catch( (err) => {
    next(err);
  })
})

module.exports = router;
