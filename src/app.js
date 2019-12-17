const mongoose = require('mongoose');
const Users = require('./models/users');

mongoose.connect('mongodb://localhost:27017/usersdb', { useNewUrlParser: true, useUnifiedTopology: true });
(async () => {
  const users = await Users.find().select("name");
  console.log(users);
})()



