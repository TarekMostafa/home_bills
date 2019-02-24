const express = require('express');

const app = express();

const port = 5000;

app.listen(port, function(){
  console.log(`Server is up and running on port ${port}`);
})
