const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./server/db/mongooseConnection');
const billsRouter = require('./server/bills/billsRouter');
const lookupsRouter = require('./server/lookups/lookupsRouter');
const billsTransactionsRouter = require('./server/billsTransactions/billsTransactionsRouter');

const uri = 'mongodb://localhost:27017/HomeUtilityDB';
const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/bills', billsRouter);
app.use('/api/lookups', lookupsRouter);
app.use('/api/billstransactions', billsTransactionsRouter);
app.use(function(err, req, res){
  console.log(err);
  res.status(500).send(err);
})

const connection = new mongooseConnection(uri);
connection.connect();
app.listen(port, function(){
  console.log(`The server is up and running on port ${port}`);
})

process.on('SIGINT', function(code) {
  console.log(`About to exit the server with code: ${code}`);
  connection.disconnect();
});
