const express = require('express');
const bills = require('./bills');

const router = express.Router();
const bill = new bills();

router.get('/', function(req, res){
  bill.getBills().then( (data) => {
    res.json(data);
  }).catch( (err) => {
    res.status(500).send(err);
  })
});

router.post('/', function(req, res){
  bill.addBill(req.body).then( () => {
    res.status(200).send('Bill has been added successfully');
  }).catch( (err) => {
    res.status(500).send(err);
  })
})

module.exports = router;
