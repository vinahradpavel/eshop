const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const validateUsers = require('./middlewares/usersValidator');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Users = require('./models/users');

mongoose.connect('mongodb://localhost:27017/usersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});


app.get('/users', async (req, res) => {
  const users = await Users.find().lean();

  return res.json({
    users,
  });
});

app.get('/users/:name', async (req, res) => {
  const { params } = req;
  const { name } = params;

  const user = await Users.findOne({ name });
  return res.json({
    user,
  });
});

app.post('/users', validateUsers({ body: ['name', 'age', 'surname'] }), async (req, res) => {
  try {
    const user = await Users.create(
      req.body,
    );

    return res.json({
      user,
    });
  } catch (error) {
    return res.json(error);
  }
});

app.delete('/users/:id', validateUsers({ params: ['id'] }), async (req, res) => {
  const { params } = req;
  const { id } = params;

  const user = await Users.findByIdAndRemove(id);

  return res.json({
    user,
  });
});

app.put('/users/:id', validateUsers({ params: ['id'], body: ['name', 'age', 'surname'] }), async (req, res) => {
  const user = await Users.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

  return res.json({
    user,
  });
});


app.listen(3000);
