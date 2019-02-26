const express = require('express');
const bodyParser = require('body-parser');
const mongooseConnection = require('./server/db/mongooseConnection');
const billsRouter = require('./server/bills/billsRouter');

const uri = 'mongodb://localhost:27017/HomeUtilityDB';
const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/bills', billsRouter);

const connection = new mongooseConnection(uri);
app.listen(port, function(){
  console.log(`The server is up and running on port ${port}`);
  connection.connect();
})

process.on('SIGINT', function(code) {
  console.log(`About to exit the server with code: ${code}`);
  connection.disconnect();
});
