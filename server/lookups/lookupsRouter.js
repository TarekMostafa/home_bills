const express = require('express');
const lookups = require('./lookups');

const router = express.Router();
const lookup = new lookups();

router.get('/frequencies', function(req,res,next){
  lookup.getFrequencies()
  .then(data => res.json(data))
  .catch(err => next(err));
});

router.get('/currencies', function(req,res,next){
  lookup.getCurrencies()
  .then(data => res.json(data))
  .catch(err => next(err));
});

router.get('/statuses', function(req,res,next){
  lookup.getStatuses()
  .then(data => res.json(data))
  .catch(err => next(err));
});

module.exports = router;
