const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Users = require('./models/users');

mongoose.connect('mongodb://localhost:27017/usersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


// (async () => {
//   const users = await Users.create({
//     name: 'Ivan',
//     surname: 'Ivanov',
//     secondName: 'Ivanovich',
//     age: 25,
//   });
//   console.log(users);
// })();

app.get('/users', async (req, res) => {
  const users = await Users.find();

  return res.json({
    users,
  });
});

app.get('/users/:name', async (req, res) => {
  const { params } = req;
  const { name } = params;

  const user = await Users.find({ name });
  return res.json({
    user,
  });
});

app.post('/users', async (req, res) => {
  const user = await Users.create(
    req.body,
  );

  return res.json({
    user,
  });
});

app.delete('/users/:id', async (req, res) => {
  const { params } = req;
  const { id } = params;

  const users = await Users.findByIdAndRemove(id);

  return res.json({
    users,
  });
});

app.put('/users/:id', async (req, res) => {
  // const { params } = req;
  // const { id } = params;
  // const { name, surname, age } = req.body;

  // upsert?
   const user = await Users.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
  //const user = await Users.findByIdAndUpdate(req.params.id, req.body, { upsert: true });

  return res.json({
    user,
  });
});


app.listen(3000);
