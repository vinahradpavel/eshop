/* eslint-disable padded-blocks */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
const express = require('express');

const app = express();

const users = [
  { name: 'Ivan', age: 18 },
  { name: 'Vasya', age: 22 },
  { name: 'Pavel', age: 25 },
  { name: 'Denis', age: 60 },
  { name: 'Ilya', age: 41 },
  { name: 'Olga', age: 22 },
];

app.get('/users', (request, response) => {
  const { query } = request;
  const { age } = query;

  if (age) {
    return response.json({
      users: users.filter(it => it.age > age),
    });
  }

});

// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
