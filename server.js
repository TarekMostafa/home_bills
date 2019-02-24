const express = require('express');
const bills = require('./server/bills/bills');

const app = express();

app.use('/api/bills', bills);

const port = 5000;
app.listen(port, function(){
  console.log(`The server is up and running on port ${port}`);
})
