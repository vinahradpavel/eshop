
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let users = [
  {
    id: 1, name: 'Ivan', age: 18, sex: 'm',
  },
  {
    id: 2, name: 'Vasya', age: 22, sex: 'f',
  },
  {
    id: 3, name: 'Pavel', age: 25, sex: 'm',
  },
  {
    id: 4, name: 'Denis', age: 60, sex: 'f',
  },
  {
    id: 5, name: 'Ilya', age: 41, sex: 'm',
  },
  {
    id: 6, name: 'Olga', age: 22, sex: 'f',
  },
];

app.get('/users', (request, response) => {
  const { query } = request;
  const { age, sex } = query;

  if (age && sex) {
    return response.json({
      users: users.filter((it) => it.age === Number(age)).filter((it) => it.sex === sex),
    });
  }
  if (age) {
    return response.json({
      users: users.filter((it) => it.age > age),
    });
  }

  if (sex) {
    return response.json({
      users: users.filter((it) => it.sex === sex),
    });
  }
  return response.json({
    users,
  });
});

app.get('/users/:name', (request, response) => {
  const { params } = request;
  const { name } = params;

  const user = users.find((it) => it.name === name);
  return response.status(200).json({
    user,
  });
});


app.post('/users', (request, response) => {
  const id = users.length + 1;

  users.push({ id, ...request.body });

  return response.status(201).json({
    users,
  });
});

app.delete('/users/:id', (request, response) => {
  const { params } = request;
  const { id } = params;

  users = users.filter((it) => it.id !== Number(id));

  return response.status(204).json({
    users,
  });
});

// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
