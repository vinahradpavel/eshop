const usersData = [
  {
    role: 'SELLER',
    isActive: true,
    name: 'Pavel',
    surname: 'Vinahrad',
    email: 'user@email.com',
    password: '$2a$10$.T1U4hMqO8pI0Hl82XU0M.Zm/UTaqsdlpBN2HDCfQo.zj8ujCjW9u',
  },
  {
    role: 'SELLER',
    isActive: true,
    name: 'Ivan',
    surname: 'Ivanov',
    email: 'user1@email.com',
    password: '$2a$10$.T1U4hMqO8pI0Hl82XU0M.Zm/UTaqsdlpBN2HDCfQo.zj8ujCjW9u',
  },
  {
    role: 'CUSTOMER',
    isActive: true,
    name: 'Vasya',
    surname: 'Vasilev',
    email: 'user2@email.com',
    password: '$2a$10$.T1U4hMqO8pI0Hl82XU0M.Zm/UTaqsdlpBN2HDCfQo.zj8ujCjW9u',
  },
];

const sellerCred = {
  email: 'email@email.com',
  password: 'password',
};

module.exports = { usersData, sellerCred };
