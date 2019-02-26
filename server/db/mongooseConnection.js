const mongoose = require('mongoose');
const options = {useNewUrlParser: true, useFindAndModify: false};

module.exports = class mongooseConnection {
  constructor(uri){
    this.uri = uri;

    mongoose.connection.on('connecting', function(){
      console.log("Mongoose trying to establish a connection");
    });
    mongoose.connection.on('connected', function(){
      console.log("Mongoose connection is established successfully");
    });
    mongoose.connection.on('error', function(err){
      console.log("Mongoose connection error: " + err);
    });
    mongoose.connection.on('disconnected', function(){
      console.log("Mongoose connection is disconnected");
    });
  }

  connect(){
    mongoose.connect(this.uri, options);
  }

  disconnect(){
    mongoose.connection.close();
  }
}
