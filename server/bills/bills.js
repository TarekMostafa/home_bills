const express = require('express');

var router = express.Router();

router.get('/', function(req, res){
  const bills = [
    {id:1, name:"Stromrechnung", frequency:"Monthly", currency:"EGP", startDate: "2017-12-31", status:"Active", lastPaidDate: 0},
    {id:2, name:"Gasrechnung", frequency:"Monthly", currency:"EGP", startDate: "2017-12-31", status:"Active", lastPaidDate: 0},
    {id:3, name:"Telefonrechnung", frequency:"Monthly", currency:"EGP", startDate: "2017-12-31", status:"Active", lastPaidDate: 0}
  ];
  res.json(bills);
});

module.exports = router;
