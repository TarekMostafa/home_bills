const express = require('express');
const bills = require('./bills');

const router = express.Router();
const bill = new bills();

router.get('/', function(req, res, next){
  bill.getBills(req.query).then( (data) => {
    res.json(data);
  }).catch( (err) => {
    next(err);
  })
});

router.get('/:id', function(req, res, next){
  bill.getBill(req.params.id).then( (data) => {
    res.json(data);
  }).catch( (err) => {
    next(err);
  })
});

router.post('/', function(req, res, next){
  bill.addBill(req.body).then( () => {
    res.status(200).send('Bill has been added successfully');
  }).catch( (err) => {
    next(err);
  })
})

router.put('/:id', function(req, res, next){
  bill.updateBill(req.params.id, req.body).then( () => {
    res.status(200).send('Bill has been updated successfully');
  }).catch( (err) => {
    next(err);
  })
})

router.delete('/:id', function(req, res, next){
  bill.deleteBill(req.params.id).then( () => {
    res.status(200).send('Bill has been deleted successfully');
  }).catch( (err) => {
    next(err);
  })
})

module.exports = router;
